const express = require('express');
const chalk = require('chalk');

const app = express();

app.get('/', function( req, res ) {
    res.send('Hello');
})

app.listen(3000, () => {
    console.log(chalk.green('Server running...'));
})