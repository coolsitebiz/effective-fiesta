const { MongoClient } = require('mongodb');
const debug = require('debug')('server:certController');

function certController() {
  function getUsers(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'certApp';

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

  return { getUsers };
}

module.exports = certController;
