module.exports = [{
  path: '/send',
  method: 'POST',
  description: 'send',
  fn: function (callback, args) {
    Homey.app.send(args.body.data, callback)
  }
}]
