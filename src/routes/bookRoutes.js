const express = require('express');

const booksRouter = express.Router();

const bookService = require('../services/goodReadService');

const { MongoClient, ObjectID } = require('mongodb');

// const sql = require('mssql');

const bookController = require('../controllers/bookController');

function router(nav) {
  const { getIndex, getById, middleWare } = bookController(bookService, nav);

  booksRouter.use(middleWare);

  booksRouter.route('/')
    .get(getIndex);

  booksRouter.route('/:id')
    .get(getById);

  return booksRouter;
}

module.exports = router;
