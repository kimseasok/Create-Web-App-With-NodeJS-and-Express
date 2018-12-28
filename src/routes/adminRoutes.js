const express = require('express');

const { MongoClient } = require('mongodb');

const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'node_test';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);

          debug('connected to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);

          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
