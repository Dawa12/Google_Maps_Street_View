const router = require('express').Router();
const dbService = require('../models/favorites');

router.post('/', dbService.saveShowFavorite, (req, res) => {
  res.redirect('/');
});

module.exports = router;
