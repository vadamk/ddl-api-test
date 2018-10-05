/**
 * Auth module.
 * @module auth
 */

const api = require('./api');
const store = require('./store');

/**
 * login
 * @param {Object} model
 * @param {string} model.userName
 * @param {string} model.password
 * @param {boolean} model.rememberMeChecked
 */
const login = async (model) => {
  model.rememberMeChecked = model.rememberMeChecked || false;
  const data = await api.login(model);
  store.auth_token = data.auth_token;
}

const getAuthToken = `Bearer ${store.auth_token}`

module.exports = {
  login,
  getAuthToken
}