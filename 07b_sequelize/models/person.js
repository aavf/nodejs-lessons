'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    profession: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  Person.associate = function(models) {
    // associations can be defined here
  };
  return Person;
};