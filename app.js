var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');

var app = express();

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('Hello world!...');
})

app.listen(3000, () => {
    debug(`Node listening on port ${chalk.green(3000)}`);
});