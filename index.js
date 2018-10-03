const faker = require('faker');
const auth = require('./services/auth');

const scenario = async () => {
  await auth.login(
    "investor@ddlinvestor.com",
    "!Qddlinvestor12345",
    false
  );
};

// const firstName = faker.name.firstName();
// const lastName = faker.name.lastName();
// const jobTitle = faker.name.jobTitle();
// const companyName = faker.name.title();
// const phoneNumber = faker.phone.phoneNumber('(###) ###-####');
// const email = faker.internet.email(firstName, lastName, 'polyswarms.com');

// registration({
//   firstName, lastName, jobTitle, companyName, phoneNumber, email,
// });




