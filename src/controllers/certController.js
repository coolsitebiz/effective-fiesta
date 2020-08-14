const { MongoClient } = require('mongodb');
const debug = require('debug')('server:certController');
const chalk = require('chalk');

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
        res.render('item', { user: response });
      } catch (err) {
        debug(err);
      }
    }());
  }

  function getUserCertById(req, res) {
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });
        debug(`Connected to database server at ${url}`);
        debug(chalk.yellow('Calling getUserCertById'));
        const db = client.db(dbName);
        const col = db.collection('users');
        const response = await col.findOne({ netid: req.params.id });
        const cert = response.certificates.find((item) => item.id.toString() === req.params.certId);
        const [month, date, year] = cert.date.toLocaleDateString().split('/');
        const certObj = {
          name: `${response.firstName} ${response.lastName}`,
          certificate: cert.certificate,
          date: `${month}/${date}/${year}`,
          userId: response.netid,
          certId: cert.id
        };
        res.render('cert', certObj);
      } catch (err) {
        debug(err);
      }
    }());
  }

  function getUsersByName(req, res) {
    (async function mongo() {
      let client;
      const userName = req.body.lastName;
      try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });
        debug(`Connected to database server at ${url}`);
        debug(chalk.yellow('Calling getUsersByName'));
        const db = client.db(dbName);
        const col = db.collection('users');
        const response = await col.find({ lastName: { $regex: userName, $options: 'i' } }).toArray();
        if (response.length === 0) {
          res.render('notfound');
        } else {
          res.render('items', { users: response });
        }
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  return {
    getUsers,
    getUserById,
    getUserCertById,
    getUsersByName
  };
}

module.exports = certController;
