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
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

const mapRoute = require('./routes/map');
const favoritesRoute = require('./routes/favorites');

app.use('/', mapRoute);
// app.use('/', dbService.getFavorite, dbService.getShowFavorite, mapRoute);

app.use('/favorites', favoritesRoute);

app.post('/showfavorite', dbService.saveShowFavorite, (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => console.log('listening on port', PORT));
