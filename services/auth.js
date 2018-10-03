/**
 * Auth module.
 * @module auth
 */

const api = require('./api');
const store = require('./store');

/**
 * login
 * @param {string} userName
 * @param {string} password  
 * @param {boolean} rememberMeChecked 
 */
const login = async (userName, password, rememberMeChecked = null) => {
  const data = await api.login({ userName, password, rememberMeChecked });
  store.auth_token = data.auth_token;
}

module.exports = {
  login
}