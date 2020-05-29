const User = require('../sequelize').User;

exports.getUsers = function (request, response, next) {
    User.findAll()
        .then(users => {
            response.send(users);
        });
};

exports.test = function (request, response, next) {
    response.send("TEST");   
};
