const router = require('express').Router();

router.use('/', require('./swagger')); 

router.get('/', (req, res) => {
    //#swagger.tags=['Welcome']
    res.send('Welcome to Chilean Soccer API');
});

router.use('/players', require('./players'));
router.use('/teams', require('./teams'));

module.exports = router;