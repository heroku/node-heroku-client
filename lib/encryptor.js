var crypto = require('crypto');

exports.encrypt = function encrypt (value) {
  var key       = process.env.HEROKU_CLIENT_ENCRYPTION_SECRET,
      iv        = crypto.randomBytes(32),
      cipher    = crypto.createCipher('aes256', key, iv),
      encrypted = cipher.update(value, 'utf8', 'base64') + cipher.final('base64');

  return encrypted;
};

exports.decrypt = function decrypt (data) {
  var key       = process.env.HEROKU_CLIENT_ENCRYPTION_SECRET,
      decipher  = crypto.createDecipher('aes256', key),
      decrypted = decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');

  return decrypted;
};
