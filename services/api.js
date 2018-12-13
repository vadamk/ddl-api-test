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

const createQuestionnaire = async model => {
  try {
    const response = await axios.post(
      `${config.host}/api/Questionnaire/CreateQuestionnaire`,
      JSON.stringify(model),
      { headers: getDefaultHeaders() }
    );
    return response.data.data.id;
  } catch (error) {
    errorHandle(error);
  }
}

const getTreeView = async model => {
  try {
    const response = await axios.post(
      `${config.host}/api/QuestionnaireTreeView`,
      JSON.stringify(model),
      { headers: getDefaultHeaders() }
    );
    return response.data.data;
  } catch (error) {
    errorHandle(error);
  }
}

const createQuestionnaireSection = async model => {
  try {
    const response = await axios.post(
      `${config.host}/api/Section/Create`,
      JSON.stringify(model),
      { headers: getDefaultHeaders() }
    );
    return response.data.data.id;
  } catch (error) {
    errorHandle(error);
  }
}

const createQuestionnaireQuestion = async model => {
  try {
    const response = await axios.post(
      `${config.host}/api/Question/Create`,
      JSON.stringify(model),
      { headers: getDefaultHeaders() }
    );
    return response.data.data.id;
  } catch (error) {
    errorHandle(error);
  }
}

const getQuestionTypes = async () => {
  try {
    const response = await axios.get(
      `${config.host}/api/Questionnaire/GetQuestionTypeChoice`,
      { headers: getDefaultHeaders() }
    );
    return response.data.data;
  } catch (error) {
    errorHandle(error);
  }
}

const getAssetClassList = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${config.host}/api/AssetClass/List/${pageNumber}/${pageSize}/%7c`,
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
  accountCreate,
  createQuestionnaire,
  getTreeView,
  createQuestionnaireSection,
  createQuestionnaireQuestion,
  getQuestionTypes,
  getAssetClassList,
};
