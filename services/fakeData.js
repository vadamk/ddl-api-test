const faker = require('faker');
const config = require('../config');

const registration = () => {

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    firstName,
    lastName,
    jobTitle: faker.name.jobTitle(),
    companyName: faker.name.title(),
    phoneNumber: faker.phone.phoneNumber('(###) ###-####'),
    email: config.userEmail ? config.userEmail : faker.internet.email(firstName, lastName, 'maildrop.cc'),
  };
}

const сreateAccountMissing = () => {
  return {
    designation: faker.lorem.words(),
    mobile: faker.phone.phoneNumber('(###) ###-####'),
    address1: faker.address.streetAddress(true),
    address2: faker.address.streetAddress(true),
    countryId: '893c142b-24bb-4291-bcc5-384be8a49ef4',
    stateId: '57695e3e-4b77-480c-9e18-83f0e91e753f',
    city: faker.address.city(),
    zipcode: faker.address.zipCode(),
    companyId: config.investorCompanyId,
    fax: faker.phone.phoneNumber('(###) ###-####'),
    phoneNumber: faker.phone.phoneNumber('(###) ###-####'),
    remarks: faker.lorem.words(),
  };
}

const creationQuestionnaire = () => {
  return {
    questionnaireTitle: faker.name.title(),
    questionnaireDescription: faker.lorem.words(),
  };
}

const creationQuestionnaireSection = () => {
  return {
    sectionName: faker.name.title(),
    description: faker.lorem.words(),
  };
}

const creationQuestionnaireQuestion = () => {
  return {
    questionTitle: faker.name.title(),
    description: faker.lorem.words(),
    questionText: faker.lorem.words(),
  };
}

module.exports = {
  registration,
  сreateAccountMissing,
  creationQuestionnaire,
  creationQuestionnaireSection,
  creationQuestionnaireQuestion,
}