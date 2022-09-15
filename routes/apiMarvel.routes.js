import express from 'express';
import controllers from '../controllers/index.js';

const router = express.Router();


router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


router.get("/comics/:comicId", controllers.apiMarvel.comics);
router.get("/comicList/:pageNum", controllers.apiMarvel.comicList);

router.get("/characters/:charactersId", controllers.apiMarvel.characters);
router.get("/search/:searchType/:searchTerm", controllers.apiMarvel.search);

export default router;