// Definição do modelo
module.exports = (sequelize, type) => {
    return sequelize.define('person', {
        firstname: type.STRING,
        lastname: type.STRING,
        profession: type.STRING,
        age: type.INTEGER
    });
}