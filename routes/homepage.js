const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

// This route serves your `/login` form
router.get('/login', (req, res) => {
  res.render('login');
});

// This route serves your `/signup` form
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
