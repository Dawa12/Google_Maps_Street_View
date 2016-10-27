const express = require('express');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('method'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(PORT, () => console.log('listening on port', PORT));
