const express = require('express');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');

const dbService = require('./models/favorites');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

const mapRoute = require('./routes/map');

app.use('/', dbService.getFavorite, mapRoute);

// app.use('/', dbService.getFavorite, mapRoute, (req, res) => {
//   res.render('/', {
//     favorites: res.favorites || [],
//   });
// });

app.post('/favorites', dbService.saveFavorite, (req, res) => {
  // console.log('saved favorite');
  // console.log(res);
  res.redirect('/');
});

app.listen(PORT, () => console.log('listening on port', PORT));


// favorites:
//    [ { _id: 581387acc7a249909da02553,
//        lat: '40.7410605',
//        lng: '-73.9896986' },
//      { _id: 581387b0c7a249909da02554,
//        lat: '40.7410605',
//        lng: '-73.9896986' },
//      { _id: 581389cd346e6c913f8b3d92,
//        lat: '40.7410605',
//        lng: '-73.9896986' },
//      { _id: 58138c9dbb832791f49b36fb,
//        lat: '40.7410605',
//        lng: '-73.9896986' },
//      { _id: 58138cc5a007ab9207fc4165,
//        lat: '40.7410605',
//        lng: '-73.9896986' },
//      { _id: 58138ce90e401b9215e09dd1,
//        lat: '40.7410605',
//        lng: '-73.9896986' },
//      { _id: 58138d474dbd5d92397f0fff,
//        lat: '40.7410605',
//        lng: '-73.9896986' },
//      { _id: 58138d7921ec3f924bdd6c54,
//        lat: '40.7410605',
//        lng: '-73.9896986' },
//      { _id: 58138e59e8efa092a1fbe8f8,
//        lat: '40.7410605',
//        lng: '-73.9896986' } ],
//   saved:
//    { result: { ok: 1, n: 1 },
//      ops: [ [Object] ],
//      insertedCount: 1,
//      insertedIds: [ 58138e6b0186c792a9f6e105 ] } }
