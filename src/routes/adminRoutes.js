const express = require('express');
const users = require('../../fakedata');

const adminRouter = express.Router();

function router(data) {
  adminRouter.route('/')
    .get((req, res) => {
      res.send(users(25));
    });
  return adminRouter;
}

module.exports = router;
