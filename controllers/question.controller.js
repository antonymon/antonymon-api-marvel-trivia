import database from '../models/index.js';
import libs from '../libs/index.js'
import moment from "moment";
import { Sequelize } from 'sequelize';

const Question = database.question;
const Comic = database.comic;
const Character = database.character;
const Points = database.points;

let startTime;

export function getQuestion(req, res) {
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
        .debug(infoLog, 'getQuestions: Iniciando método GET.');

    Question.findAll()
        .then(questions => {
            if (questions.length === 0) {
                infoLog.responseCode = 404;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, 'getQuestions: No se encontraron preguntas.');

                const resObj = libs.utils.errorParse(404, { message: "No se encontraron preguntas." });
                res.status(resObj.errorCode).send(resObj);
                return;
            }
            else {
                infoLog.responseCode = 200;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().info(infoLog, 'getQuestions: Responde exitosamente.');

                res.send(questions);
            }
        })
        .catch(err => {
            infoLog.responseCode = 500;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `getQuestions: ${err.message}`);

            const resObj = libs.utils.errorParse(500, `getQuestions: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
            return;
        });
}

export function getQuestionFindByComicAndCharacter(req, res) {
    startTime = moment(new Date());
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
        .debug(infoLog, 'getQuestionFindByComicAndCharacter: Iniciando método GET.');

    const { comicId, characterId } = req.params;

    Question.findAll({
        where: {
            comicId: parseInt(comicId),
            characterId: parseInt(characterId)
        }
    })
        .then(questions => {
            if (questions.length > 0) {
                infoLog.responseCode = 200;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().debug(infoLog, 'getQuestionFindByComicAndCharacter: Preguntas obtenidas.');

                res.status(200).send(questions);
            } else {
                infoLog.responseCode = 404;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().debug(infoLog, 'getQuestionFindByComicAndCharacter: Preguntas no encontradas.');

                const resObj = libs.utils.errorParse(404, 'getQuestionFindByComicAndCharacter: Preguntas no encontradas.');
                res.status(resObj.errorCode).send(resObj);
                return;
            }
        })
        .catch(err => {
            infoLog.responseCode = 500;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `getQuestionFindByComicAndCharacter: ${err.message}`);

            const resObj = libs.utils.errorParse(500, `getQuestionFindByComicAndCharacter: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
            return;
        })
}

export function postQuestion(req, res) {
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
        .debug(infoLog, "postQuestions: Iniciando método POST.");

    Question.create({
        comicId: parseInt(req.body.comicId),
        characterId: parseInt(req.body.characterId),
        typeQuestion: req.body.typeQuestion,
        question: req.body.question,
        awserPosibility: req.body.awserPosibility,
        awser: req.body.awser,
        points: req.body.points
    })
        .then(question => {
            infoLog.responseCode = 200;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().info(infoLog, "postQuestions: Pregunta creada.");

            //creo comic y personaje

            Comic.findAll({
                where: {
                    id: req.body.comicId
                }
            })
                .then(comics => {
                    if (comics.length === 0) {
                        Comic.create({
                            id: req.body.comic.id,
                            title: req.body.comic.title,
                            description: req.body.comic.description,
                            thumbnail: req.body.comic.thumbnail,
                        })
                            .then(comic => {
                                Character.findAll({
                                    where: {
                                        id: req.body.characterId
                                    }
                                })
                                    .then(characters => {
                                        if (characters.length === 0) {
                                            Character.create({
                                                id: req.body.character.id,
                                                title: req.body.character.title,
                                                description: req.body.character.description,
                                                thumbnail: req.body.character.thumbnail,
                                            })
                                                .then(character => {
                                                    // eslint-disable-next-line no-console
                                                    console.log("comic y personaje creados," + comic + character);
                                                })
                                                .catch(err => {
                                                    // eslint-disable-next-line no-console
                                                    console.log("error al crear personaje, " + err);
                                                });
                                        }
                                    })
                            })
                            .catch(err => {
                                // eslint-disable-next-line no-console
                                console.log("error al crear comic," + err);
                            });
                    }
                })
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.log("error al buscar comic," + err);
                });
            //

            res.status(200).send(question);
        })
        .catch(err => {
            infoLog.responseCode = 500;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `createQuestion: ${err.message}`);

            const resObj = libs.utils.errorParse(500, `createQuestion: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
        });
}

export function putQuestion(req, res) {
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
        .debug(infoLog, "putQuestions: Iniciando método PUT.");

    const idQuestion = req.params.id;

    Question.update({
        typeQuestion: req.body.typeQuestion,
        question: req.body.question,
        awserPosibility: req.body.awserPosibility,
        awser: req.body.awser,
        points: req.body.points
    },
        {
            where: {
                id: idQuestion
            }
        })
        .then(() => {
            infoLog.responseCode = 200;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().info(infoLog, "putQuestions: Pregunta actualizada.");

            res.status(200).send("Pregunta actualizada.");
        })
        .catch(err => {
            infoLog.responseCode = 400;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `putQuestions: ${err.message}`);

            const resObj = libs.utils.errorParse(400, `putQuestions: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
        });
}

export function deleteQuestion(req, res) {
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
        .debug(infoLog, "deleteQuestions: Iniciando método DELETE.");

    const idQuestion = req.params.id;

    Question.destroy({
        where: {
            id: idQuestion
        }
    })
        .then((result) => {
            if (result === 1) {
                infoLog.responseCode = 200;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().info(infoLog, "deleteQuestions: Pregunta eliminada.");

                res.status(200).send("Pregunta eliminada.");
            } else {
                infoLog.responseCode = 404;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, "deleteQuestions: Pregunta no encontrada.");

                const resObj = libs.utils.errorParse(404, "deleteQuestions: Pregunta no encontrada.");
                res.status(resObj.errorCode).send(resObj);
            }
        })
        .catch(err => {
            infoLog.responseCode = 400;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `deleteQuestions: ${err.message}`);

            const resObj = libs.utils.errorParse(400, `deleteQuestions: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
        });
}

export function getQuestionFinByComicAndCharacterDinamic(req, res) {
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
        .debug(infoLog, "getQuestionFinByComicAndCharacterDinamic: Iniciando método GET.");

    const idComic = parseInt(req.params.comicId);
    const characters = req.params.characters.split("-").map(Number);

    Question.findAll({
        where: {
            comicId: idComic,
            characterId: {
                [Sequelize.Op.in]: characters
            }
        },
        order: database.sequelize.random(),
        limit: 10
    })
        .then(questions => {
            if (questions.length === 0) {
                infoLog.responseCode = 404;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, "getQuestionFinByComicAndCharacterDinamic: Pregunta no encontrada.");

                const resObj = libs.utils.errorParse(404, "getQuestionFinByComicAndCharacterDinamic: Pregunta no encontrada.");
                res.status(resObj.errorCode).send(resObj);
            } else {
                infoLog.responseCode = 200;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().info(infoLog, "getQuestionFinByComicAndCharacterDinamic: Pregunta encontrada.");

                //

                let questionsArray = [];
                for (let i = 0; i < questions.length; i++) {
                    let question = {
                        category: "Entertainment: Comics",
                        type: questions[i].typeQuestion,
                        question: questions[i].question,
                        difficulty: "easy",
                        correct_answer: questions[i].awser,
                        incorrect_answers: questions[i].awserPosibility,
                        points: questions[i].points
                    }

                    questionsArray.push(question);
                }

                //

                res.status(200).send(questionsArray);
            }
        })
        .catch(err => {
            infoLog.responseCode = 400;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `getQuestionFinByComicAndCharacterDinamic: ${err.message}`);

            const resObj = libs.utils.errorParse(400, `getQuestionFinByComicAndCharacterDinamic: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
        });
}

export function postQuestionPoints(req, res) {
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
        .debug(infoLog, "postQuestionPoint: Iniciando método POST.");

    const email = req.body.email;
    const comicId = parseInt(req.body.comicId);
    const characters = req.body.characters;
    const points = parseInt(req.body.points);

    Points.create({
        email: email,
        comicId: comicId,
        characters: characters,
        points: points
    })
        .then(() => {
            infoLog.responseCode = 200;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().info(infoLog, "postQuestionPoint: Puntos de pregunta creados.");

            res.status(200).send("Puntos de pregunta creados.");
        })
        .catch(err => {
            infoLog.responseCode = 400;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `postQuestionPoint: ${err.message}`);

            const resObj = libs.utils.errorParse(400, `postQuestionPoint: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
        });
}

export function getQuestionPoints(req, res) {
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
        .debug(infoLog, "getQuestionPoint: Iniciando método GET.");

    const email = req.params.email;

    Points.findAll({
        where: {
            email: email
        }
    })
        .then(points => {
            if (points.length === 0) {
                infoLog.responseCode = 404;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, "getQuestionPoint: Puntos no encontrados.");

                const resObj = libs.utils.errorParse(404, "getQuestionPoint: Puntos no encontrados.");
                res.status(resObj.errorCode).send(resObj);
            } else {
                infoLog.responseCode = 200;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().info(infoLog, "getQuestionPoint: Puntos encontrados.");

                res.status(200).send(points);
            }
        })
        .catch(err => {
            infoLog.responseCode = 400;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `getQuestionPoint: ${err.message}`);

            const resObj = libs.utils.errorParse(400, `getQuestionPoint: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
        });
}