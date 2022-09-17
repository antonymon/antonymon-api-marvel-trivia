export default (sequelize, Sequelize) => {
    const Question = sequelize.define("cuestion", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            notNull: true
        },
        comicId: {
            type: Sequelize.INTEGER,
            notNull: true
        },
        characterId: {
            type: Sequelize.INTEGER,
            notNull: true
        },
        typeQuestion: {
            type: Sequelize.STRING,
            notNull: true
        },
        question: {
            type: Sequelize.STRING,
            notNull: true
        },
        awserPosibility: {
            type: Sequelize.STRING,
            notNull: true
        },
        awser: {
            type: Sequelize.STRING,
            notNull: true
        },
        points: {
            type: Sequelize.INTEGER,
            notNull: true
        }
    });
    return Question;
}