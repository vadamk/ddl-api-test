const api = require('./api');
const store = require('./store');

const login = async (model) => {
  model.rememberMeChecked = model.rememberMeChecked || false;
  const data = await api.login(model);
  store.setAuthToken(data.auth_token);
}

const getAuthToken = () => `Bearer ${store.getAuthToken()}`;
const isLoginned = () => !!store.getAuthToken();

module.exports = {
  login,
  getAuthToken,
  isLoginned,
}