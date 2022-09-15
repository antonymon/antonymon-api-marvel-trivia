import express from 'express';

import middleware from "../middlewares/index.js";
import controllers from "../controllers/index.js";

const router = express.Router();

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post(
    "/signup",
    [
        middleware.verifySignUp.checkDuplicateUsernameOrEmail,
        middleware.verifySignUp.checkRolesExisted
    ],
    controllers.auth.signup
);

router.post("/signin", controllers.auth.signin);

export default router;