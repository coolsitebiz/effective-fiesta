const faker = require('faker');
const { ObjectId } = require('mongodb');

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
      completedCerts.push({
        id: ObjectId(),
        certificate: certs[randomCert],
        date: faker.date.past()
      });
      usedCerts.push(certs[randomCert]);
    }
  }
  const sortedCerts = completedCerts.sort((a, b) => {
    if (a.certificate.toUpperCase() > b.certificate.toUpperCase()) { return 1; }
    if (a.certificate.toUpperCase() < b.certificate.toUpperCase()) { return -1; }
    return 0;
  });
  return sortedCerts;
}

function createUser() {
  const user = {
    firstName: `${faker.name.firstName()}`,
    lastName: `${faker.name.lastName()}`,
    netid: faker.random.uuid(),
    certificates: getCerts()
  };

  return user;
}

function createUserList(numUsers) {
  for (let i = 0; i < numUsers; i += 1) {
    userList.push(createUser());
  }
  const sortedUsers = userList.sort((a, b) => {
    const nameA = a.lastName.toUpperCase() + a.firstName.toUpperCase();
    const nameB = b.lastName.toUpperCase() + b.firstName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sortedUsers;
}

module.exports = createUserList;
