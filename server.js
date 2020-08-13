const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const data = { data: 'foo' };

const certRouter = require('./src/routes/certRoutes')();
const adminRouter = require('./src/routes/adminRoutes')(data);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/admin', adminRouter);
app.use('/items', certRouter);
app.get('/', (req, res) => {
  res.render(
    'index'
  );
});

app.listen(port, () => {
  debug(chalk.green(`Server listening on port ${port}`));
});
