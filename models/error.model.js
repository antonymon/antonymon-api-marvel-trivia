export default (sequelize, Sequelize) => {
    const Error = sequelize.define("error", {
        errorCode: {
            type: Sequelize.INTEGER
        },
        errorType: {
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Error;
};