const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminroutes');
const getUsers = require('../../fakedata');

const adminRouter = express.Router();

function router(data) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'certApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useUnifiedTopology: true });
          debug('Connected to database server');
          const users = getUsers(25);
          const db = client.db(dbName);
          const response = await db.collection('users').insertMany(users);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
