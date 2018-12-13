const auth_token = null;

module.exports = {
  auth_token: null,
  setAuthToken: val => this.auth_token = val,
  getAuthToken: () => this.auth_token || null,
};
