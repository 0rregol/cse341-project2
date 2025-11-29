const express = require('express');
const router = express.Router();

const playersController = require('../controllers/players');

const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', playersController.getAll);

router.get('/:id', playersController.getSingle);

router.post('/', isAuthenticated, playersController.createPlayer);

router.put('/:id', isAuthenticated, playersController.updatePlayer);

router.delete('/:id', isAuthenticated, playersController.deletePlayer);


module.exports = router;