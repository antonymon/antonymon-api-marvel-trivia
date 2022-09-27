import express from 'express';
import { verifyToken, isModerator, isAdmin } from '../middlewares/authJwt.js';
import controllers from '../controllers/index.js';

const router = express.Router();


router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/all", controllers.user.allAccess);

router.get(
    "/user",
    [verifyToken],
    controllers.user.userBoard
);

router.get(
    "/mod",
    [verifyToken, isModerator],
    controllers.user.moderatorBoard
);

router.get(
    "/admin",
    [verifyToken, isAdmin],
    controllers.user.adminBoard
);

router.put(
    "/updateUser/:username",
    [verifyToken],
    controllers.user.updateUser
);

export default router;