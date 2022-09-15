import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import moment from 'moment';
import libs from '../libs/index.js'

import database from '../models/index.js'

const User = database.user;

let startTime;

export function verifyToken(req, res, next) {
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
        .debug(infoLog, 'verifyToken: Iniciando middleware.');


    let token = req.headers["x-access-token"];
    if (!token) {
        infoLog.responseCode = 403;
        infoLog.responseTime = libs.utils.getResponseTime(startTime);
        libs.utils.getLog().error(infoLog, 'verifyToken: ¡No se proporciona token!');

        const resObj = libs.utils.errorParse(403, { message: "¡No se proporciona token!" });
        return res.status(resObj.errorCode).send(resObj);
    }
    jwt.verify(token, config.auth.SECRET, (err, decoded) => {
        if (err) {
            infoLog.responseCode = 401;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, 'verifyToken: ¡No autorizado!');

            const resObj = libs.utils.errorParse(401, { message: "¡No autorizado!" });
            return res.status(resObj.errorCode).send(resObj);
        }
        req.userId = decoded.id;
        next();
    });
};

export function isAdmin(req, res, next) {
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
        .debug(infoLog, 'isAdmin: Iniciando middleware.');

    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            infoLog.responseCode = 403;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, 'isAdmin: ¡Requiere rol de administrador!');

            const resObj = libs.utils.errorParse(403, { message: "¡Requiere rol de administrador!" });
            res.status(resObj.errorCode).send(resObj);
            return;
        });
    });
};

export function isModerator(req, res, next) {
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
        .debug(infoLog, 'isModerator: Iniciando middleware.');

    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }

            infoLog.responseCode = 403;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, 'isModerator: ¡Requiere rol de moderador!');

            const resObj = libs.utils.errorParse(403, { message: "¡Requiere rol de moderador!" });
            res.status(resObj.errorCode).send(resObj);
        });
    });
};

export function isModeratorOrAdmin(req, res, next) {
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
        .debug(infoLog, 'isModeratorOrAdmin: Iniciando middleware.');

    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            infoLog.responseCode = 403;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, 'isModeratorOrAdmin: ¡Requiere rol de moderador o administrador!');

            const resObj = libs.utils.errorParse(403, { message: "¡Requiere rol de moderador o administrador!" });
            res.status(resObj.errorCode).send(resObj);
        });
    });
};