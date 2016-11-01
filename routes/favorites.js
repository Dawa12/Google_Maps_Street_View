const router = require('express').Router();
const dbService = require('../models/favorites');

router.post('/', dbService.saveFavorite, (req, res) => {
  res.redirect('/');
});

router.delete('/:id', dbService.deleteFavorite, (req, res) => {
  res.redirect('/');
});

module.exports = router;
