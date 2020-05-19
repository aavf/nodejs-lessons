var express = require('express');
var router = express.Router();
// Require our controllers.
var person_controller = require('../controllers/personController');

/// PERSON ROUTES ///

// GET request for one Person.
router.get('/:id', person_controller.person_detail);

// GET request for list of all Persons.
router.get('/', person_controller.person_list);

module.exports = router;
