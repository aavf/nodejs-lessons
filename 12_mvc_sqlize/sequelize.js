const Sequelize = require('sequelize');
const PersonModel = require('./models/person');


const sequelize = new Sequelize('personsdb', 'uma', 'uma+web', {
  host: '127.0.0.1',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Person = PersonModel(sequelize, Sequelize);


// Adicionar o modelo à BD
sequelize.sync({ force: true })
    .then(() => {
        console.log("Tables Created!");
        Person.bulkCreate([
            { firstname: "David", lastname: "Jardim", profession: "IT", age: 99 },
            { firstname: "Maria", lastname: "Lopes", profession: "Chef", age: 19 },
            { firstname: "Pedro", lastname: "Mata", profession: "Piloto", age: 39 },
            { firstname: "Vicente", lastname: "Ventura", profession: "Gamer", age: 33 },
            { firstname: "Dante", lastname: "Silva", profession: "Artista", age: 45 },
        ]).then(() => {
                return Person.findAll();
            })
            .then((persons) => {
                //console.log(persons);
            });
    });

module.exports = {
  Person
}