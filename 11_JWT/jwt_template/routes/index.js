var express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();

var indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index.ejs');
});


/* login. */
router.get('/login', function (req, res) {
  // render the page and pass in any flash data if it exists
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.post('/login', indexController.login);


/* signup. */
router.get('/signup', function (req, res) {
  // render the page and pass in any flash data if it exists
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/signup', indexController.signup);


// TODO: profile


module.exports = router;
