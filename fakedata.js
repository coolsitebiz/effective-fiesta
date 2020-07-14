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

console.log(firstName, lastName, netid, certs[Math.floor(Math.random() * Math.floor(5))]);
