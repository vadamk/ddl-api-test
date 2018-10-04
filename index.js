// const faker = require('faker');
const auth = require('./services/auth');
// const api = require('./services/api');

const flow = async () => {
  await auth.login({
    userName: 'investor@ddlinvestor.com',
    password: '!Qddlinvestor12345'
  });
};

flow();

// const firstName = faker.name.firstName();
// const lastName = faker.name.lastName();
// const jobTitle = faker.name.jobTitle();
// const companyName = faker.name.title();
// const phoneNumber = faker.phone.phoneNumber('(###) ###-####');
// const email = faker.internet.email(firstName, lastName, 'maildrop.cc');

// api.registration({
//   firstName, lastName, jobTitle, companyName, phoneNumber, email,
// });




