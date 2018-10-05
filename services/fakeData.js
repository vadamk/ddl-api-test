const faker = require('faker');
const config = require('../config');

/**
 * Return registration request data
 * 
 * @typedef {Object} Ruq
 * @property {string} Ruq.firstName
 * @property {string} Ruq.lastName
 * @property {string} Ruq.jobTitle
 * @property {string} Ruq.companyName
 * @property {string} Ruq.phoneNumber
 * @property {string} Ruq.email
 * 
 * @returns {Ruq}
 */
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

module.exports = {
  registration,
  сreateAccountMissing
}