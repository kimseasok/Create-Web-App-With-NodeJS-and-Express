const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
// const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3030 || 3000;

// const config = {
//   user: 'SA',
//   password: 'Op3nmymi@l',
//   server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
//   database: 'node_test',

//   options: {
//     encrypt: false // Use this if you're on Windows Azure
//   }
// };

// sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public/')));

// Serve static file from node modules

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/fonts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }
];

const booksRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/AuthRoutes')(nav);

app.use('/books', booksRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }
    ],
    title: 'Library',
  });
});

app.listen(port, () => {
  debug(`Node listening at port ${chalk.green(port)}`);
});
