const router = require('express').Router();
const dbService = require('../models/favorites');
const { authenticate } = require('../lib/auth');

router.post('/', dbService.saveShowFavorite, (req, res) => {
  res.redirect('/map');
});

module.exports = router;
