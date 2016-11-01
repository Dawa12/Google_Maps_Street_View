const router = require('express').Router();
const dbService = require('../models/favorites');

router.get('/', dbService.getFavorite, dbService.getShowFavorite, (req, res) => {
  // console.log('index page router works');
  res.render('index', {
    lat: 40.7410605,
    lng: -73.9896986,
    favorites: res.favorites,
    showFavorite: res.showFavorite,
  });
});

module.exports = router;
