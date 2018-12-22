var express = require('express');
var chalk = require('chalk');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello world!...');
})

app.listen(3000, () => {
    console.log(`Node listening on port ${chalk.green(3000)}`);
});