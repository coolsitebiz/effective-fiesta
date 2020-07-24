const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('server:adminRoutes');
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
          debug(`Connected to database server at ${url}`);
          const db = client.db(dbName);
          const col = db.collection('users');
          await col.drop();
          const users = getUsers(25);
          const response = await col.insertMany(users);
          res.send(`inserted ${response.ops.length} new users`);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
