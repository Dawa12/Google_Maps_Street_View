const express = require('express');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');
const dotEnv          = require('dotenv').config({silent: true});
const session         = require('express-session');
const cookieParser    = require('cookie-parser');

const dbService = require('./models/favorites');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

const mapRoute = require('./routes/map');
const favoritesRoute = require('./routes/favorites');
const showfavoriteRoute = require('./routes/showfavorite')

app.use('/', mapRoute);
app.use('/favorites', favoritesRoute);
app.use('/showfavorite', showfavoriteRoute);

app.listen(PORT, () => console.log('listening on port', PORT));
