'use strict'

var signal
var initFlag

exports.init = function () {
  if (!initFlag) {
    console.log('GT9000: Init')
    initFlag = true
    signal = new Homey.wireless('433').Signal({
      sof: [],
      eof: [3000],
      words: [
        [300, 1100], // 0
        [1100, 300]  // 1
      ],
      interval: 7000,
      repetitions: 4,
      sensitivity: 0.6,
      minimalLength: 24,
      maximalLength: 24
    })
    signal.register(function( err, success ){
      console.log('GT9000: err', err, 'success', success)
    })
    signal.on('payload', function(payload, first){
      // console.log('first', first)
      if (!first) return
      console.log('payload', payload)
    })
  }
}

exports.send = function (data, callback) {
  if (!Array.isArray(data)) {
    callback(new Error('invalid data'))
    return
  }
  console.log('send', data)
  var frame = new Buffer(data)
  signal.tx(frame, function(err, result) {
    console.log('GT9000 tx:', err, result)
    callback(err, {
      result: result
    })
  })
}
