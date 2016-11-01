const router = require('express').Router();
const dbService = require('../models/favorites');
// const { authenticate } = require('../lib/auth');

router.post('/', dbService.saveFavorite, (req, res) => {
  res.redirect('/map');
});

router.delete('/:id', dbService.deleteFavorite, (req, res) => {
  res.redirect('/map');
});

module.exports = router;
