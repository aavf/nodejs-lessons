const jwt = require("jsonwebtoken");
const User = require('../sequelize').User;

exports.signup = function (req, res) {
  var { email } = req.body;
  var { password } = req.body;
  User.findOne({
    where: {
      email: email
    }
  }).then(result => {
    if (result == null) {
      User.create({ 'email': email, 'password': password })
        .then(createdUser => {
          // TODO: call generate token and add it to user session, redirect to profile

        });
    }
    else {
      req.flash('signupMessage', 'That e-mail is already taken.');
      res.redirect('/signup');
    }
  }).catch(function (err) {
    // handle error;
    //return done(err);
  });
}

exports.login = function (req, res) {
  var { email } = req.body;
  var { password } = req.body;
  User.findOne({
    where: {
      email: email
    }
  }).then(result => {
    if (result == null) {
      req.flash('loginMessage', 'No user found with that e-mail.');
      res.redirect('/login');
    }
    else if (result.password != password) {
      req.flash('loginMessage', 'Oops! Wrong password.');
      res.redirect('/login');

    } else {
      // TODO: call generate token and add it to user session, redirect to profile
      
    }
  }).catch(function (err) {
    // handle error;
    //return done(err);
  });
}

// TODO: generate token function

