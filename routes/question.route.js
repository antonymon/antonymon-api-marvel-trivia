import express from 'express';
import controllers from '../controllers/index.js';
import { verifyToken, isModerator, isAdmin } from '../middlewares/authJwt.js';

const router = express.Router();

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get(
    "/questions",
    [verifyToken, isAdmin],
    controllers.question.getQuestion
);

router.get(
    "/questions/:comicId/:characterId",
    [verifyToken, isAdmin],
    controllers.question.getQuestionFindByComicAndCharacter
);

router.post(
    "/questions",
    [verifyToken, isAdmin],
    controllers.question.postQuestion
);

router.put(
    "/questions/:id",
    [verifyToken, isAdmin],
    controllers.question.putQuestion
);

router.delete(
    "/questions/:id",
    [verifyToken, isAdmin],
    controllers.question.deleteQuestion
);

router.get(
    "/questions/play/:comicId/:characters",
    [verifyToken],
    controllers.question.getQuestionFinByComicAndCharacterDinamic
);

router.post(
    "/questions/play/points",
    [verifyToken],
    controllers.question.postQuestionPoints
);

router.post(
    "/questions/play/points/:email",
    [verifyToken],
    controllers.question.getQuestionPoints
);

export default router;