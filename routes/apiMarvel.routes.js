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
    "/comics/:comicId",
    [verifyToken],
    controllers.apiMarvel.comics
);

router.get(
    "/comicList/:pageNum",
    [verifyToken],
    controllers.apiMarvel.comicList
);

router.get(
    "/characters/:charactersId",
    [verifyToken],
    controllers.apiMarvel.characters
);

router.get(
    "/search/:searchType/:searchTerm",
    [verifyToken],
    controllers.apiMarvel.search
);

export default router;