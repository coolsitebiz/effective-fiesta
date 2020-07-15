const faker = require('faker');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const netid = faker.random.uuid();

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
  const numc = Math.floor(Math.random() * Math.floor(certs.length));
  for (let i = 0; i < numc; i += 1) {
    const randomCert = Math.floor(Math.random() * Math.floor(certs.length));
    if (!usedCerts.includes(certs[randomCert])) {
      completedCerts.push({ certificate: certs[randomCert], date: faker.date.recent() });
      usedCerts.push(certs[randomCert]);
    }
  }
  return completedCerts;
}

const user = {
  name: `${firstName} ${lastName}`,
  netid,
  certificates: getCerts()
};

console.log(user);
