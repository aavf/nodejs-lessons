var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController');

/* GET users listing route. */
router.get('/', router.authenticateTokenFromSession, usersController.getUsers);

module.exports = router;
