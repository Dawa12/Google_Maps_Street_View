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

// app.use('/', dbService.getFavorite, mapRoute);
app.use('/', dbService.getFavorite, dbService.getShowFavorite, mapRoute);

app.post('/favorites', dbService.saveFavorite, (req, res) => {
  res.redirect('/');
});

app.post('/showfavorite', dbService.saveShowFavorite, (req,res) => {
  console.log('show fav post route executed');
  res.redirect('/');
});

app.listen(PORT, () => console.log('listening on port', PORT));
