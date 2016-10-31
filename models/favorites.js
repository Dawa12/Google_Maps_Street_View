const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

const dbConnection = 'mongodb://localhost:27017/maps';

function getFavorite(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('favorites')
    .find({})
    .sort({ collectionName: 1})
    .toArray((arrayError, data) => {
      if (arrayError) return next(arrayError);
      res.favorites = data;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}

function saveFavorite(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

// console.log('showing req.body', req.body);

    db.collection('favorites')
      .insert(req.body.favorite, (insertErr, result) => {
        if (insertErr) return next(insertErr);

        res.saved = result;
// console.log('inside saveFavorite function', result);
        db.close();
        return next();
      });
    return false;
  });
  return false;
}


function deleteFavorite(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('favorites')
      .findAndRemove({ _id: ObjectID(req.params.id)}, (removeErr, doc) => {
        if(removeErr) return next(removeErr);

        res.removed = doc;
        db.close();
        return next();
      });
    return false;
  })
  return false;
}


function saveShowFavorite(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('showfavorites')
      .insert(req.body.favorite, (insertErr, result) => {
        if (insertErr) return next(insertErr);
          res.saved = result;
          db.close();
          return next();
      });
    return false;
  });
  return false;
}

function getShowFavorite(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

console.log('still working');

    db.collection('showfavorites')
    .find({})
    .sort({ collectionName: 1})
    .toArray((arrayError, data) => {
      if (arrayError) return next(arrayError);
      res.showFavorite = data;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}


module.exports = {
  getFavorite,
  saveFavorite,
  // deleteFavorite,
  saveShowFavorite,
  getShowFavorite,
};
