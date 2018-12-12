/**
 * Storage module.
 * @module store
 */

const auth_token = null;

module.exports = {

  /**
   * @type {string}
   */
  auth_token: null,
  setAuthToken: val => auth_token = val,
  getAuthToken: () => auth_token || null,
};
