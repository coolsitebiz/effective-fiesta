const express = require('express');
const certController = require('../controllers/certController');

const certRouter = express.Router();

function router() {
  const { getUsers, getUserById, getUserCertById, getUsersByName } = certController();
  certRouter.route('/')
    .get(getUsers);
  certRouter.route('/')
    .post(getUsersByName);
  certRouter.route('/:id/:certId')
    .get(getUserCertById);
  certRouter.route('/:id')
    .get(getUserById);

  return certRouter;
}

module.exports = router;
