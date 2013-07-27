module.exports = function account(options, callback) {
  return this.request('/account', options, callback);
};
