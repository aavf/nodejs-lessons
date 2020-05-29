const Sequelize = require('sequelize');
const UserModel = require('./models/user');

// Connection pool
const sequelize = new Sequelize('personsdb', 'uma', 'uma+web', { // TODO: change to .env values
  host: 'localhost', // TODO: change to .env values
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = UserModel(sequelize, Sequelize);

// Adicionar o modelo à BD
sequelize.sync({ force: true })
  .then(() => {
    console.log("Tables Created!");
    User.bulkCreate([
      { email: "one@gmail.com", password: "111" },
      { email: "two@gmail.com", password: "222" },
      { email: "three@gmail.com", password: "333" },
    ]).then(() => {
      return User.findAll();
    }).then((users) => {
        //console.log(users);
      });
  });

module.exports = {
  User
}