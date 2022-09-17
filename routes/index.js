import express from 'express';

import homeRouter from './home.routes.js'
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import error404Router from './error404.routes.js';

import apiMarvelRouter from './apiMarvel.routes.js'
import question from './question.route.js';

function routerApi(app) {
  const router = express.Router();

  app.use('/apiMarvelTrivia/v1', router);

  router.use('/', homeRouter);

  router.use('/auth', authRouter);
  router.use('/test', userRouter);

  router.use('/external/apiMarvel', apiMarvelRouter);

  router.use('/maintenance', question);

  router.use('/*', error404Router);
}

export default routerApi;
