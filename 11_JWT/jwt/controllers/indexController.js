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
          const token = generateAccessToken(email, password);
          req.session.user = createdUser;
          req.session.token = token;
          res.redirect('/profile');
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
      const token = generateAccessToken(email, password);
      req.session.user = result;
      req.session.token = token;
      res.redirect('/profile');
    }
  }).catch(function (err) {
    // handle error;
    //return done(err);
  });
}

function generateAccessToken(email, password) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({ email, password }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
