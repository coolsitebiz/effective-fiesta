const express = require('express');

const certRouter = express.Router();

function router(dummyData) {
  certRouter.route('/')
    .get((req, res) => {
      res.render('items', dummyData);
    });

  certRouter.route('/item')
    .get((req, res) => {
      res.render('item');
    });

  return certRouter;
}

module.exports = router;
