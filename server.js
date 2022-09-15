import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import config from './config/index.js';
import routerApi from './routes/index.js';
import database from './models/index.js';

import libs from './libs/index.js';

const app = express();
const port = config.server.NODE_PORT || 3000;

const morganFormat = process.env.NODE_ENV == 'prod' ? 'common' : 'dev';

app.use(morgan(morganFormat));


app.use(express.json());

const whitelist = ['http://localhost:3000', 'https://app.com'];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataValuesLog = new database.log();

// eslint-disable-next-line no-unused-vars
const { id, ...Log } = dataValuesLog;

const Role = database.role;
const User = database.user;

database.sequelize.sync({ force: true }).then(() => {
  libs.utils.getLog().info(Log, `Drop and Resync DB`);
  libs.initialData.dataRole(Role);
  libs.initialData.dataUser(User, Role, database.Sequelize.Op);
})

//production
//database.sequelize.sync();


routerApi(app);

app.use(libs.utils.errorHandler);


app.listen(port, () => {
  libs.utils.getLog().info(Log, `listening on port ${port}...`);
});