import database from '../models/index.js';
import config from '../config/index.js';
import moment from 'moment';
import libs from '../libs/index.js'
import bcrypt from 'bcryptjs';

export function allAccess(req, res) {
    res.status(200).send({ mensage: 'Contenido Público.' });
}
export function userBoard(req, res) {
    res.status(200).send({ mensaje: 'Contenido de Usuario.' });
}
export function adminBoard(req, res) {
    res.status(200).send({ mensaje: 'Contenido de Administrador.' });
}
export function moderatorBoard(req, res) {
    res.status(200).send({ mensaje: 'Contenido de Moderador.' });
}

const User = database.user;
let startTime;

export async function updateUser(req, res) {
    try {
        startTime = moment(new Date());

        let dataValuesLog = new database.log({
            uri: req.url,
            clientIP: libs.utils.getClientIP(req)
        });

        let { dataValues } = dataValuesLog;
        // eslint-disable-next-line no-unused-vars
        let { id, ...infoLog } = dataValues;

        infoLog.responseTime = libs.utils.getResponseTime(startTime);

        libs.utils.getLog()
            .debug(infoLog, 'updateUser: Iniciando método POST.');

        const { username } = req.params;

        const { name, email, password, imageBase64 } = req.body;

        if (name === undefined && email === undefined && password === undefined && imageBase64 === undefined) {
            infoLog.responseCode = 404;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, 'updateUser: Parametros no validos.');

            const resObj = libs.utils.errorParse(404, { message: "Parametros no validos." });
            res.status(resObj.errorCode).send(resObj);
            return;
        }

        const user = await User.findOne({
            attributes: ['id', 'username', 'name', 'email', 'password', 'imageBase64'],
            where: { username: username }
        });

        if (!user) {
            infoLog.responseCode = 404;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, 'updateUser: Usuario no enocontrado.');

            const resObj = libs.utils.errorParse(404, { message: "Usuario no enocontrado." });
            res.status(resObj.errorCode).send(resObj);
            return;
        }

        let validateUsernameAndEmail;

        if (email) {
            if (email !== user.email) {
                validateUsernameAndEmail = await User.findAll({
                    where: {
                        [database.Sequelize.Op.or]: [
                            { username: username },
                            { email: email }
                        ]
                    }
                });
            }
        }

        if (validateUsernameAndEmail && validateUsernameAndEmail.length > 0) {
            infoLog.responseCode = 400;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, 'updateUser: El nombre de usuario o el correo electrónico ya están en uso.');
            const resObj = libs.utils.errorParse(400, { message: "El nombre de usuario o el correo electrónico ya están en uso." });
            res.status(resObj.errorCode).send(resObj);
            return;
        } else {

            let userUpdated = {};
            if (email) {
                userUpdated.username = email.split('@')[0];
                userUpdated.email = email;
            }
            if (name) userUpdated.name = name;
            if (password) userUpdated.password = bcrypt.hashSync(password, 8);
            if (imageBase64) {
                userUpdated.imageBase64 = imageBase64;
            }

            const updateUser = await User.update(userUpdated, {
                where: { username: username }
            });

            const userUpdatedResponse = await User.findOne({
                attributes: ['username', 'name', 'email', 'imageBase64'],
                where: { username: username }
            });

            infoLog.responseCode = 200;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().info(infoLog, 'updateUser: Responde exitosamente.');

            res.send({ message: 'Usuario actualizado correctamente', updateUser, userUpdatedResponse });
        }
    } catch (error) {
        startTime = moment(new Date());

        let dataValuesLog = new database.log({
            uri: req.url,
            clientIP: libs.utils.getClientIP(req)
        });

        let { dataValues } = dataValuesLog;
        // eslint-disable-next-line no-unused-vars
        let { id, ...infoLog } = dataValues;

        infoLog.responseTime = libs.utils.getResponseTime(startTime);
        infoLog.responseCode = 400;
        infoLog.responseTime = libs.utils.getResponseTime(startTime);
        libs.utils.getLog().error(infoLog, 'updateUser: El nombre de usuario o el correo electrónico ya están en uso.');
        const resObj = libs.utils.errorParse(400, { message: "El nombre de usuario o el correo electrónico ya están en uso." });
        res.status(resObj.errorCode).send(resObj);
        return;
    }
}