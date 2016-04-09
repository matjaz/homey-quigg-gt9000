'use strict'

var signal
var initFlag

exports.init = function () {
  if (!initFlag) {
    console.log('GT9000: Init')
    initFlag = true
    signal = new Homey.wireless('433').Signal({
        sof: [],
        eof: [3000, 7000],
        words: [
            [416, 1040], // 0
            [1040, 624], // 1
            [1040, 832], // 2
            [832, 1040], // 3
        ],
        interval: 13000,
        // manchesterUnit: 208,
        repetitions: 4,
        sensitivity: 0.9,
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

exports.send = function () {
  var data = [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1]
  console.log('send', data.length, data)
  var frame = new Buffer(data)
  signal.tx(frame, function(err, result) {
    console.log('GT9000 tx:', err, result)
  })
}
