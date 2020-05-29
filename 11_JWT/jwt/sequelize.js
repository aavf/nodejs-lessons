const Sequelize = require('sequelize');
const UserModel = require('./models/user');

// Connection pool
const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS, { //, process.env.DB_PORT
  host: process.env.DB_HOST,
  dialect: 'mysql',
  //port: process.env.DB_PORT,
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
      { email: "dada@gmail.com", password: "test" },
      { email: "daa@gmail.com", password: "werr" },
      { email: "fada@gmail.com", password: "tetrtrtst" },
      { email: "lada@gmail.com", password: "tetryryst" },

    ]).then(() => {
      return User.findAll();
    })
      .then((users) => {
        //console.log(users);
      });
  });

module.exports = {
  User
}