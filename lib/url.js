'use strict'

module.exports = function (u) {
  if (u.indexOf('http') !== 0 && u.indexOf('https') !== 0) {
    u = 'https://' + u
  }

  const uu = new URL(u)
  let port = uu.port
  if (!port) {
    if (uu.protocol === 'https:') {
      port = '443'
    } else {
      port = '80'
    }
  }
  const secure = uu.protocol === 'https:' || uu.port === '443'

  return { host: uu.hostname, port: parseInt(port), secure: secure }
}
