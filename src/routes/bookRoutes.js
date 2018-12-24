const express = require('express');

const booksRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstory',
    read: false
  },
  {
    title: 'Les Miserable',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Jouney in the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  }
];

booksRouter.route('/')
  .get((req, res) => {
    res.render('books', {
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }
      ],
      title: 'Books',
      books
    });
  });

booksRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;

    res.render('book', {
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }
      ],
      title: 'Books',
      book: books[id]
    });
  });

module.exports = booksRouter;
