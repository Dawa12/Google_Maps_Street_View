const express = require('express');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config({silent: true});
const session = require('express-session');
const cookieParser = require('cookie-parser');
const SECRET = 'tacos3000';

const dbService = require('./models/favorites');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

// This is how we read the cookies sent over from the browser
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET,
}));

const mapRoute = require('./routes/map');
const favoritesRoute = require('./routes/favorites');
const showfavoriteRoute = require('./routes/showfavorite');
const homepageRouter = require('./routes/homepage');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

app.use('/', homepageRouter);
app.use('/map', mapRoute);
app.use('/favorites', favoritesRoute);
app.use('/showfavorite', showfavoriteRoute);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => console.log('listening on port', PORT));
