const express = require('express');

const booksRouter = express.Router();

const sql = require('mssql');

// const debug = require('debug')('app:bookRoutes');


function router(nav) {
  booksRouter.route('/')
    .get((req, res) => {
      (async function queryBooks() {
        const request = new sql.Request();
        const result = await request.query('select * from books');
        res.render('books', {
          nav,
          title: 'Books',
          books: result.recordset
        });
      }());
    });

  booksRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      (async function querybook() {
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id).query(`select * from books where book_id=${id}`);
        res.render('book', {
          nav,
          title: 'Single Book',
          book: recordset[0]
        });
      }());
    });
  return booksRouter;
}

module.exports = router;
