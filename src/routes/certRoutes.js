const express = require('express');
const certController = require('../controllers/certController');

const certRouter = express.Router();

function router() {
  const { getUsers } = certController();
  certRouter.route('/')
    .get(getUsers);
  certRouter.route('/item')
    .get((req, res) => {
      res.render('item');
    });

  return certRouter;
}

module.exports = router;
