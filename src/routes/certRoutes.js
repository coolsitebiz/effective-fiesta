const express = require('express');
const certController = require('../controllers/certController');

const certRouter = express.Router();

function router() {
  const { getUsers, getUserById } = certController();
  certRouter.route('/')
    .get(getUsers);
  certRouter.route('/:id')
    .get(getUserById);

  return certRouter;
}

module.exports = router;
