var express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();

var indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index.ejs');
});

router.get('/login', function (req, res) {
  // render the page and pass in any flash data if it exists
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.post('/login', indexController.login);


router.get('/signup', function (req, res) {
  // render the page and pass in any flash data if it exists
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/signup', indexController.signup);


router.get('/profile', authenticateTokenFromSession, function (req, res) {
  res.render('profile.ejs', {
    user: req.session.user // get the user out of session and pass to template
  });
}); 

function authenticateTokenFromSession(req, res, next) {
  const token = req.session.token;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authenticateTokenFromHeaders(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  
  if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
