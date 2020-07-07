const express = require('express');

const certRouter = express.Router();

certRouter.route('/')
  .get((req, res) => {
    res.render('items');
  });

certRouter.route('/item')
  .get((req, res) => {
    res.send('hello single item');
  });

module.exports = certRouter;
