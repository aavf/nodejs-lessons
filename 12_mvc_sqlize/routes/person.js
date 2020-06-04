var express = require('express');
var router = express.Router();

// Require our controllers.
var personController = require('../controllers/personController');

router.get('/', personController.getAllPerson);

router.put('/', personController.createPerson);
router.put('/alt', personController.createPersonAlt);

router.delete('/:id', personController.deletePerson);

router.get('/:id', personController.getPersonById);

router.get('/:profession/:age', personController.getPersonByProfessionAndAge);

router.post('/:id', personController.updatePerson);

module.exports = router;
