const { MongoClient } = require('mongodb');
const debug = require('debug')('server:certController');

function certController() {
  const url = 'mongodb://localhost:27017';
  const dbName = 'certApp';
  function getUsers(req, res) {
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });
        debug(`Connected to database server at ${url}`);
        const db = client.db(dbName);
        const col = db.collection('users');
        const response = await col.find().toArray();
        res.render('items', { users: response });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function getUserById(req, res) {
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });
        debug(`Connected to database server at ${url}`);
        const db = client.db(dbName);
        const col = db.collection('users');
        const response = await col.findOne({ netid: req.params.id });
        res.send(response);
      } catch (err) {
        debug(err);
      }
    }());
  }

  return { getUsers, getUserById };
}

module.exports = certController;
