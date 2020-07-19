const faker = require('faker');

const userList = [];

const certs = [
  'Supervisory Skills',
  'Human Resources Administration',
  'Fiscal Management',
  'Communications',
  'Personal Productivity'
];

function getCerts() {
  const completedCerts = [];
  const usedCerts = [];
  const numCerts = Math.floor(Math.random() * Math.floor(certs.length));
  for (let i = 0; i < numCerts; i += 1) {
    const randomCert = Math.floor(Math.random() * Math.floor(certs.length));
    if (!usedCerts.includes(certs[randomCert])) {
      completedCerts.push({ certificate: certs[randomCert], date: faker.date.recent() });
      usedCerts.push(certs[randomCert]);
    }
  }
  return completedCerts;
}

function createUser() {
  const user = {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    netid: faker.random.uuid(),
    certificates: getCerts()
  };

  return user;
}

function createUserList(numUsers) {
  for (let i = 0; i < numUsers; i += 1) {
    userList.push(createUser());
  }
  return userList;
}

module.exports = createUserList;
