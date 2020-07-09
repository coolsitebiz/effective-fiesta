const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const dummyData = { data: 'foo' };

const certRouter = require('./src/routes/certRoutes')(dummyData);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/items', certRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      list: ['item 1', 'item 2', 'item 3'],
      title: 'TITLE FOR THE PAGE'
    }
  );
});

app.listen(port, () => {
  debug(chalk.green(`Server listening on port ${port}`));
});
