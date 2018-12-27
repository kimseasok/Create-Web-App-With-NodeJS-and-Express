const express = require('express');

const booksRouter = express.Router();

const { MongoClient, ObjectID } = require('mongodb');

// const sql = require('mssql');

const debug = require('debug')('app:bookRoutes');


function router(nav) {
  booksRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'node_test';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);

          debug('connected to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();

          res.render('books', {
            nav,
            title: 'Books',
            books
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  booksRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'node_test';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);

          debug('connected to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const book = await col.findOne({ _id: new ObjectID(id) });
          res.render('book', {
            nav,
            title: 'Single Book',
            book
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return booksRouter;
}

module.exports = router;
