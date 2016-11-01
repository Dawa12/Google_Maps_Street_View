const router = require('express').Router();
const dbService = require('../models/favorites');
const { authenticate } = require('../lib/auth');

router.get('/', authenticate, dbService.getFavorite, dbService.getShowFavorite, (req, res) => {
  // console.log('index page router works');
  res.render('index', {
    lat: 40.7410605,
    lng: -73.9896986,
    user: res.user,
    favorites: res.favorites,
    showFavorite: res.showFavorite,
  });
});

module.exports = router;
