export default (sequelize, Sequelize) => {
    const Cuestion = sequelize.define("cuestion", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            notNull: true
        },
        idComic: {
            type: Sequelize.INTEGER
        },
        idCharacter: {
            type: Sequelize.INTEGER
        },
        typeCuestion: {
            type: Sequelize.STRING
        },
        cuestion: {
            type: Sequelize.STRING
        },
        awser: {
            type: Sequelize.STRING
        }
    });
    return Cuestion;
}