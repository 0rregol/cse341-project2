const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger')); 

router.get('/', (req, res) => {
    //#swagger.tags=['Welcome']
    res.send('Welcome to Chilean Soccer API');
});

router.use('/players', require('./players'));
router.use('/teams', require('./teams'));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); } 
      res.redirect('/');
    });  
    }); 

module.exports = router;