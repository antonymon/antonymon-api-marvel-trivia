export default (sequelize, Sequelize) => {
    const Comic = sequelize.define("comic", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            notNull: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        thumbnail: {
            type: Sequelize.STRING
        }
    });

    return Comic;
}
