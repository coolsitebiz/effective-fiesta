const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const path = require('path');

const port = 3000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(port, () => {
  debug(chalk.green(`Server listening on port ${port}`));
});
