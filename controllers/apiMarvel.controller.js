import moment from 'moment';
import database from '../models/index.js';

import libs from '../libs/index.js'

import sevices from '../services/index.js'


let startTime;

export function comics(req, res) {
    startTime = moment(new Date());

    let dataValuesLog = new database.log({
        uri: req.url,
        clientIP: libs.utils.getClientIP(req)
    });

    let { dataValues } = dataValuesLog;
    // eslint-disable-next-line no-unused-vars
    let { id, ...infoLog } = dataValues;

    const comicId = req.params.comicId;
    sevices.marvelComics(comicId)
        .then((data) => {
            infoLog.responseCode = 200;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().info(infoLog, 'marvelComics: Responde exitosamente.');

            res.status(200).send(data);
            return;
        })
        .catch((e) => {
            try {
                const data = JSON.parse(e.message);
                infoLog.responseCode = data.status;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, `marvelComics: ${data.message}`);

                const resObj = libs.utils.errorParse(data.status, {
                    message: data.message
                },
                    data.status
                );

                res.status(resObj.errorCode).send(resObj);
                return;
            } catch (error) {
                infoLog.responseCode = 400;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, `marvelComics: ${error.message}`);

                const resObj = libs.utils.errorParse(400, {
                    message: error.message
                }
                );

                res.status(resObj.errorCode).send(resObj);
                return;
            }
        })

}

export function comicList(req, res) {
    startTime = moment(new Date());

    let dataValuesLog = new database.log({
        uri: req.url,
        clientIP: libs.utils.getClientIP(req)
    });

    let { dataValues } = dataValuesLog;
    // eslint-disable-next-line no-unused-vars
    let { id, ...infoLog } = dataValues;

    const pageNum = req.params.pageNum;
    sevices.marvelComicList(pageNum)
        .then((data) => {
            infoLog.responseCode = 200;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().info(infoLog, 'comicList: Responde exitosamente.');

            res.status(200).send(data);
            return;
        })
        .catch((e) => {
            try {
                const data = JSON.parse(e.message);
                infoLog.responseCode = data.status;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, `comicList: ${data.message}`);

                const resObj = libs.utils.errorParse(data.status, {
                    message: data.message
                },
                    data.status
                );

                res.status(resObj.errorCode).send(resObj);
                return;
            } catch (error) {
                try {
                    const data = JSON.parse(e.message);
                    infoLog.responseCode = data.status;
                    infoLog.responseTime = libs.utils.getResponseTime(startTime);
                    libs.utils.getLog().error(infoLog, `comicList: ${data.message}`);

                    const resObj = libs.utils.errorParse(data.status, {
                        message: data.message
                    },
                        data.status
                    );

                    res.status(resObj.errorCode).send(resObj);
                    return;
                } catch (error) {
                    infoLog.responseCode = 400;
                    infoLog.responseTime = libs.utils.getResponseTime(startTime);
                    libs.utils.getLog().error(infoLog, `comicList: ${error.message}`);

                    const resObj = libs.utils.errorParse(400, {
                        message: error.message
                    }
                    );

                    res.status(resObj.errorCode).send(resObj);
                    return;
                }
            }
        })

}

export function search(req, res) {
    startTime = moment(new Date());

    let dataValuesLog = new database.log({
        uri: req.url,
        clientIP: libs.utils.getClientIP(req)
    });

    let { dataValues } = dataValuesLog;
    // eslint-disable-next-line no-unused-vars
    let { id, ...infoLog } = dataValues;

    const searchType = req.params.searchType;
    const searchTerm = req.params.searchTerm;

    sevices.marvelSearch(searchType, searchTerm)
        .then((data) => {
            infoLog.responseCode = 200;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().info(infoLog, 'search: Responde exitosamente.');

            res.status(200).send(data);
            return;
        })
        .catch((e) => {
            try {
                const data = JSON.parse(e.message);
                infoLog.responseCode = data.status;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, `search: ${data.message}`);

                const resObj = libs.utils.errorParse(data.status, {
                    message: data.message
                },
                    data.status
                );

                res.status(resObj.errorCode).send(resObj);
                return;
            } catch (error) {
                infoLog.responseCode = 400;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, `search: ${error.message}`);

                const resObj = libs.utils.errorParse(400, {
                    message: error.message
                }
                );

                res.status(resObj.errorCode).send(resObj);
                return;
            }
        })

}

export function characters(req, res) {
    startTime = moment(new Date());

    let dataValuesLog = new database.log({
        uri: req.url,
        clientIP: libs.utils.getClientIP(req)
    });

    let { dataValues } = dataValuesLog;
    // eslint-disable-next-line no-unused-vars
    let { id, ...infoLog } = dataValues;

    const charactersId = req.params.charactersId;
    sevices.marvelCharacters(charactersId)
        .then((data) => {
            infoLog.responseCode = 200;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().info(infoLog, 'characters: Responde exitosamente.');


            //valida si el personaje existe y si existe valida si tiene preguntas
            const comicId = req.query.idComic;

            const Question = database.question;

            Question.findAll({
                where: {
                    comicId: comicId
                }
            })
                .then((questions) => {
                    if (questions.length <= 0) {
                        data.data.results[0].questions = false;
                        res.status(200).send(data);
                        return;
                    } else {
                        Question.findAll({
                            where: {
                                comicId: comicId,
                                characterId: charactersId
                            }
                        })
                            .then((questions) => {
                                if (questions.length <= 0) {
                                    data.data.results[0].questions = false;
                                } else {
                                    data.data.results[0].questions = true;
                                }
                                res.status(200).send(data);
                                return;
                            })
                            // eslint-disable-next-line no-unused-vars
                            .catch((e) => {
                                data.data.results[0].questions = false;
                                res.status(200).send(data);
                            })
                    }
                })
                .catch((e) => {
                    // eslint-disable-next-line no-console
                    console.log(e);
                    data.data.results[0].questions = false;
                    res.status(200).send(data);
                    return;
                })
            //
            // res.status(200).send(data);
            //return;
        })
        .catch((e) => {
            try {
                const data = JSON.parse(e.message);
                infoLog.responseCode = data.status;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, `characters: ${data.message}`);

                const resObj = libs.utils.errorParse(data.status, {
                    message: data.message
                },
                    data.status
                );

                res.status(resObj.errorCode).send(resObj);
                return;
            } catch (error) {
                infoLog.responseCode = 400;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, `characters: ${error.message}`);

                const resObj = libs.utils.errorParse(400, {
                    message: error.message
                }
                );

                res.status(resObj.errorCode).send(resObj);
                return;
            }
        })

}