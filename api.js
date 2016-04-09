module.exports = [{
  path: '/send',
  method: 'GET',
  description: 'send',
  fn: function (callback, args) {
    Homey.app.send()
    callback(null, 'ok')
  }
}]
