import moment from 'moment-timezone';
import bunyan from 'bunyan'
import os from 'os'
import ip from 'ip'

import config from '../config/index.js';

import database from '../models/index.js';

const logLevel = config.log.LEVEL;

export function errorHandler(errParam, req, res, next) {
    let err = errParam;

    if (err.status === 503) {
        err = error(503);
        const log = getLog();
        const infoLog = new database.log({
            uri: req.url,
            clientIP: getClientIP(req)
        });
        infoLog.responseCode = 503;
        log.error(infoLog, getError(error(503)));
    }

    if (!err.status) err = error(500);

    const status = err.status || 500;

    res.status(status).json({
        error: {
            errorCode: err.errorCode,
            errorType: err.errorType,
            code: err.code,
            description: err.description
        }
    });
}

export function errorParse(code, errorDescription, errorCode, res) {
    let err = new database.error();

    switch (code) {
        case 400:
            err.errorCode = 400;
            err.errorType = 'MSJ';
            err.code = '001';
            err.description = 'Bad Request.';
            break;
        case 401:
            err.errorCode = 401;
            err.errorType = 'SEG';
            err.code = '001';
            err.description = 'Invalid authorization token.';
            break;
        case 403:
            err.errorCode = 403;
            err.errorType = 'NEG';
            err.code = '001';
            err.description = 'Business error.';
            break;
        case 404:
            err.errorCode = 404;
            err.errorType = 'MSJ';
            err.code = '002';
            err.description = 'Not Found';
            break;
        case 500:
            err.errorCode = 500;
            err.errorType = 'Internal server error.';
            err.code = '001';
            err.description = 'Internal server error.';
            break;
        case 503:
            err.errorCode = 503;
            err.errorType = 'COM';
            err.code = '003';
            err.description = 'There is no communication with the service.';
            break;
        case 504:
            err.errorCode = 504;
            err.errorType = 'COM';
            err.code = '003';
            err.description = 'There is no communication with the service.';
            break;
        default:
            err.description = 'Unknow error.';
    }
    err.description = errorDescription || err.description;
    err.code = errorCode || err.code;


    const { id, ...errObj } = err.dataValues;

    return errObj;
}

export function error(code, errorDescription, errorCode, res) {
    const err = new database.error();
    if (code === '-1') {
        err.status = 403;
    } else {
        err.status = code;
    }
    switch (code) {
        case 204:
            err.errorCode = 204;
            err.errorType = 'MSJ';
            err.code = '002';
            err.description = '';
            break;
        case 400:
            err.errorCode = 400;
            err.errorType = 'MSJ';
            err.code = '001';
            err.description = 'Error en mensaje de entrada.';
            break;
        case 401:
            err.errorCode = 401;
            err.errorType = 'SEG';
            err.code = '001';
            err.description = 'Token invalido de autorización.';
            break;
        case 403:
            err.errorCode = 403;
            err.errorType = 'NEG';
            err.code = '003';
            err.description = 'Error del servicio externo.';
            break;
        case 409:
            err.errorCode = 409;
            err.errorType = 'NEG';
            err.code = '003';
            err.description = '';
            break;
        case 404:
            err.errorCode = 404;
            err.errorType = 'MSJ';
            err.code = '002';
            err.description = 'Tratando de acceder a recurso que no existe';
            break;
        case 500:
            err.errorCode = 500;
            err.errorType = 'INF';
            err.code = '003';
            err.description = 'Internal server error.';
            break;
        case 503:
            err.errorCode = 503;
            err.errorType = 'COM';
            err.code = '003';
            err.description = 'No hay comunicacion con el servicio.';
            break;
        case 504:
            err.errorCode = 504;
            err.errorType = 'COM';
            err.code = '003';
            err.description = 'No hay comunicacion con el servicio.';
            break;
        default:
            if (code) {
                err.errorCode = 403;
                err.errorType = 'NEG';
                err.code = code;
                err.description = errorDescription;
            } else {
                err.errorDescription = 'Unknown error.';
            }
    }

    if (!errorDescription) return err;

    err.errorDescription = errorDescription;

    const { id, ...errObj } = err.dataValues;

    return errObj;
}

export function error503(req, res, next) {
    next(error(503));
}

export function error404(req, res, next) {
    next(error(404));
}

export function getLog() {
    let log = bunyan.createLogger({
        name: config.log.NAME,
        hostname: `${os.hostname()} : ${ip.address()}`,
        streams: [{
            type: 'rotating-file',
            level: 'debug',
            name: 'debug',
            path: config.log.LEVEL_DEBUG_PATH,
            period: '1d',
            count: 3
        }, {
            type: 'rotating-file',
            level: 'error',
            name: 'error',
            path: config.log.LEVEL_ERROR_PATH,
            period: '1d',
            count: 3
        }],
        apiKey: '',
        uri: '',
        responseCode: '',
        responseTime: '',
        clientIP: ''
    });

    switch (logLevel) {
        case 'ERROR':
            log.levels('debug', 60);
            log.levels('error', 50);
            break;
        case ('INFO'):
            log.levels('debug', 30);
            log.levels('error', 50);
            break;
        case 'DEBUG':
            log.levels('debug', 20);
            log.levels('error', 50);
            break;
        default:
            break;
    }
    return log;
}

export function getError(err) {
    const errorModel = new Error();
    errorModel.errorCode = err.code;
    errorModel.errorType = err.description;
    return errorModel;
}

export function getResponseTime(startTime) {
    const endTime = moment(new Date());
    const duration = moment.duration(endTime.diff(startTime));
    return duration.as('milliseconds');
}

export function getClientIP(req) {
    return req.headers['x-forwarded-for']
        || req.connection.remoteAddress
        || req.socket.remoteAddress
        || req.connection.socket.remoteAddress;
}
