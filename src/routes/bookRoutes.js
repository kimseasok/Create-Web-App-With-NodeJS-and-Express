const express = require('express');

const booksRouter = express.Router();

const sql = require('mssql');

// const debug = require('debug')('app:bookRoutes');


function router(nav) {
  // const books = [
  //   {
  //     title: 'War and Peace',
  //     genre: 'Historical Fiction',
  //     author: 'Lev Nikolayevich Tolstory',
  //     read: false
  //   },
  //   {
  //     title: 'Les Miserable',
  //     genre: 'Science Fiction',
  //     author: 'H. G. Wells',
  //     read: false
  //   },
  //   {
  //     title: 'A Jouney in the Center of the Earth',
  //     genre: 'Science Fiction',
  //     author: 'Jules Verne',
  //     read: false
  //   }
  // ];
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
        const result = await request.query(`select * from books where book_id=${id}`);
        res.render('book', {
          nav,
          title: 'Single Book',
          book: result.recordset[0]
        });
      }());
    });
  return booksRouter;
}

module.exports = router;
