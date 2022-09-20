export default (sequelize, Sequelize) => {
    const Points = sequelize.define("points", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            notNull: true
        },
        comicId: {
            type: Sequelize.INTEGER,
            notNull: true
        },
        characters: {
            type: Sequelize.STRING,
            notNull: true
        },
        points: {
            type: Sequelize.INTEGER,
            notNull: true
        }
    });
    return Points;
};
