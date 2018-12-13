const api = require('./api');
const store = require('./store');

const login = async (model) => {
  model.rememberMeChecked = model.rememberMeChecked || false;
  const data = await api.login(model);
  store.setAuthToken(data.auth_token);
}

const getAuthToken = `Bearer ${store.auth_token}`;
const isLoginned = () => !!store.auth_token;

module.exports = {
  login,
  getAuthToken,
  isLoginned,
}