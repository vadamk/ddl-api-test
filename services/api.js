const axios = require('axios');
const store = require('./store');
const config = require('../config');
const errorHandle = require('./error');

const getDefaultHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Origin': 'http://localhost'
  };

  const token = store.getAuthToken();
  
  if (token) {
    headers.authorization = `Bearer ${token}`
  }

  return headers;
};

/**
 * Login request
 * @param {Object} model
 * @param {string} model.userName
 * @param {string} model.password
 * @param {boolean} model.rememberMeChecked
 */
const login = async model => {
  try {
    const response = await axios.post(
      `${config.host}/api/auth/login`,
      model
    );
    return response.data;
  } catch (error) {
    errorHandle(error);
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
const registration = async model => {
  try {
    const response = await axios.post(
      `${config.host}/api/RegistrationRequest/Create`,
      JSON.stringify(model),
      { headers: getDefaultHeaders() }
    );
    return response.data;
  } catch (error) {
    errorHandle(error);
  }
}

/**
 * Registration request change status
 * @param {Object} model
 * @param {string} model.id
 * @param {boolean} model.isApproved
 * @param {string} model.declineReason
 */
const registrationRequestChangeStatus = async model => {
  try {
    const response = await axios.put(
      `${config.host}/api/RegistrationRequest/ChangeStatus`,
      JSON.stringify(model),
      { headers: getDefaultHeaders() }
    );
    return response.data.data;
  } catch (error) {
    errorHandle(error);
  }
}

/**
 * Registration requests list
 * @param {Object} model
 * @param {string} model.pageNumber
 * @param {string} model.pageSize
 * @param {string} model.filterString
 * @param {string} model.orderString
 */
const registrationRequestsList = async model => {
  try {
    const { pageNumber, pageSize, filterString, orderString } = model;
    const response = await axios.get(
      `${config.host}/api/RegistrationRequest/List/${pageNumber}/${pageSize}/${filterString}%7C${orderString}`,
      { headers: getDefaultHeaders() }
    );
    return response.data.data;
  } catch (error) {
    errorHandle(error);
  }
}

/**
 * Create account
 * @param {Object} model
 * @param {string} model.email
 * @param {string} model.firstName
 * @param {string} model.lastName
 * @param {string} model.jobTitle
 * @param {string} model.designation
 * @param {string} model.mobile
 * @param {string} model.address1
 * @param {string} model.countryId
 * @param {string} model.stateId
 * @param {string} model.city
 * @param {string} model.zipcode
 * @param {string} model.companyId
 */
const accountCreate = async model => {
  try {
    const response = await axios.post(
      `${config.host}/api/Account/Create`,
      JSON.stringify(model),
      { headers: getDefaultHeaders() }
    );
    return response.data.data;
  } catch (error) {
    errorHandle(error);
  }
}

module.exports = {
  login,
  registration,
  registrationRequestsList,
  registrationRequestChangeStatus,
  accountCreate
};
