import database from '../models/index.js';
import libs from '../libs/index.js'
import moment from "moment";

const Question = database.question;

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