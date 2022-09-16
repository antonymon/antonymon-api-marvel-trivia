import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import moment from 'moment';

import database from '../models/index.js';
import config from '../config/index.js';

import libs from '../libs/index.js'

const User = database.user;
const Role = database.role;
const Op = database.Sequelize.Op;

let startTime;

export function signup(req, res) {
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
        .debug(infoLog, 'signup: Iniciando método POST.');


    User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        infoLog.responseCode = 200;
                        infoLog.responseTime = libs.utils.getResponseTime(startTime);
                        libs.utils.getLog().info(infoLog, 'signup: Responde exitosamente.');

                        res.send({ message: "¡El usuario se registró con éxito!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    infoLog.responseCode = 200;
                    infoLog.responseTime = libs.utils.getResponseTime(startTime);
                    libs.utils.getLog().info(infoLog, 'signup: Responde exitosamente.');

                    res.send({ message: "¡El usuario se registró con éxito!" });
                });
            }
        })
        .catch(err => {
            infoLog.responseCode = 500;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `signup: ${err.message}`);

            const resObj = libs.utils.errorParse(500, `signup: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
            return;
        });
};


export function signin(req, res) {
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
        .debug(infoLog, 'signin: Iniciando método POST.');

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                infoLog.responseCode = 404;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, 'signin: Usuario no enocontrado.');

                const resObj = libs.utils.errorParse(404, { message: "Usuario no enocontrado." });
                res.status(resObj.errorCode).send(resObj);
                return;
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                infoLog.responseCode = 401;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, 'signin: ¡Contraseña Inválida!.');

                const resObj = libs.utils.errorParse(401, {
                    accessToken: null,
                    message: '¡Contraseña Inválida!'
                });

                res.status(resObj.errorCode).send(resObj);
                return;
            }

            var token = jwt.sign({ id: user.id }, config.auth.SECRET, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }

                infoLog.responseCode = 200;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().info(infoLog, 'signin: Responde exitosamente.');

                res.status(200).send({
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            infoLog.responseCode = 500;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `signin: ${err.message}`);

            const resObj = libs.utils.errorParse(500, `signin: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
            return;
        });
};