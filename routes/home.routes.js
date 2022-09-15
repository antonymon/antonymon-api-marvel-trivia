import express from 'express';
import libs from '../libs/index.js';

const router = express.Router();

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/', (req, res) => {
    res.send('API Marvel Trivia');

    libs.utils.getLog().info({}, 'API Marvel Trivia');
}
);

export default router;