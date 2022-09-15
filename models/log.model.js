export default (sequelize, Sequelize) => {
    const Log = sequelize.define("log", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        apiKey: {
            type: Sequelize.STRING
        },
        uri: {
            type: Sequelize.STRING
        },
        responseCode: {
            type: Sequelize.INTEGER
        },
        responseTime: {
            type: Sequelize.INTEGER
        },
        clientIP: {
            type: Sequelize.STRING
        },
    });
    return Log;
};