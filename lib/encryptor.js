'use strict';

var crypto = require('crypto');

exports.encrypt = function encrypt(value) {
  var key       = process.env.HEROKU_CLIENT_ENCRYPTION_SECRET;
  var iv        = crypto.randomBytes(32);
  var cipher    = crypto.createCipher('aes256', key, iv);
  var encrypted = cipher.update(value, 'utf8', 'base64') + cipher.final('base64');

  return encrypted;
};

exports.decrypt = function decrypt(data) {
  var key       = process.env.HEROKU_CLIENT_ENCRYPTION_SECRET;
  var decipher  = crypto.createDecipher('aes256', key);
  var decrypted = decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');

  return decrypted;
};
