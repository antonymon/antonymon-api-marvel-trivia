import Sequelize from 'sequelize'

import config from '../config/index.js';

import user from './user.model.js';
import role from './role.model.js';

import comic from './comic.model.js';
import character from './character.model.js';
import question from './question.model.js';

import log from './log.model.js';
import error from './error.model.js';

const sequelize = new Sequelize(
    config.database.DB,
    config.database.USER,
    config.database.PASSWORD,
    {
        host: config.database.HOST,
        dialect: config.database.dialect,
        operatorsAliases: 0,

        pool: {
            max: config.database.pool.max,
            min: config.database.pool.min,
            acquire: config.database.pool.acquire,
            idle: config.database.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//user
db.user = user(sequelize, Sequelize);
db.role = role(sequelize, Sequelize);

db.log = log(sequelize, Sequelize);
db.error = error(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "moderator", "admin"];

//user

//cuestion

db.comic = comic(sequelize, Sequelize);
db.character = character(sequelize, Sequelize);
db.question = question(sequelize, Sequelize);
//cuestion

export default db;