/**
 * Api module.
 * @module api
 */

const axios = require('axios');

const host = 'https://dev-api.diligend.com';

/**
 * Login request
 * @param {Object} model
 * @param {string} model.userName
 * @param {string} model.password
 * @param {boolean} model.rememberMeChecked
 */
const login = async (model) => {
  try {
    const response = await axios.post(`${host}/api/auth/login`, model);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Registration request
 * @param {Object} model
 * @param {string} model.firstName
 * @param {string} model.lastName
 * @param {string} model.jobTitle
 * @param {string} model.companyName
 * @param {string} model.phoneNumber
 * @param {string} model.email
 */
const registration = async (model) => {
  try {
    const response = await axios.post(`${host}/api/RegistrationRequest/Create`, model);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  login,
  registration
};
