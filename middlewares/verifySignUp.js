import moment from 'moment';
import libs from '../libs/index.js'

import database from '../models/index.js'

const ROLES = database.ROLES;
const User = database.user;

let startTime;

export function checkDuplicateUsernameOrEmail(req, res, next) {
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
        .debug(infoLog, 'checkDuplicateUsernameOrEmail: Iniciando middleware.');

    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            infoLog.responseCode = 400;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, 'checkDuplicateUsernameOrEmail: ¡Ha fallado! ¡El nombre de usuario ya está en uso!');

            const resObj = libs.utils.errorParse(400, { message: "¡Ha fallado! ¡El nombre de usuario ya está en uso!" });
            res.status(resObj.errorCode).send(resObj);
            return;
        }

        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                infoLog.responseCode = 400;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, 'checkDuplicateUsernameOrEmail: ¡Ha fallado! ¡El correo de usuario ya está en uso!');

                const resObj = libs.utils.errorParse(400, { message: "¡Ha fallado! ¡El correo de usuario ya está en uso!" });
                res.status(resObj.errorCode).send(resObj);
                return;
            }
            next();
        });
    });
};

export function checkRolesExisted(req, res, next) {
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
        .debug(infoLog, 'checkRolesExisted: Iniciando middleware.');

    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                infoLog.responseCode = 400;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, `checkRolesExisted: ¡Error! El rol no existe = ${req.body.roles[i]}`);

                const resObj = libs.utils.errorParse(400, { message: `¡Error! El rol no existe = ${req.body.roles[i]}` });
                res.status(resObj.errorCode).send(resObj);
                return;
            }
        }
    }

    next();
};
