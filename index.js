import { PixooAPI } from 'pixoo-api'
import { sleep, randomInt } from './helpers.js'
import colors from './colors.js'

const pixoo = new PixooAPI('192.168.1.56', 64)
await pixoo.initialize()

pixoo.clear()
pixoo.fill(colors.black)


// HORIZONTAL LAYOUT
// const titlePadding = 0

// pixoo.drawTextLeft("APM", 0, colors.white, titlePadding )
// pixoo.drawRect( [ 0, 6 ], [ 63, 21 ], colors.white, false )

// pixoo.drawTextLeft("Synthetics", 22, colors.white, titlePadding )
// pixoo.drawRect( [ 0, 28 ], [ 63, 42 ], colors.white, false )

// pixoo.drawTextLeft("SLOs", 43, colors.white, titlePadding )
// pixoo.drawRect( [ 0, 49 ], [ 63, 63 ], colors.white, false )

// pixoo.push()

const fillFrom = (start) => {
  for (var i=0; i<6; i++) {
    const col = start[0] + i*3
    for (var j=0; j<18; j++) {
      const row = start[1] + j*3
      pixoo.drawRect( [ col, row ], [ col+2, row+2 ], colors.green, true )
    }
  }
  pixoo.push()
}

fillFrom([ 2, 8 ])
fillFrom([ 23, 8 ])
fillFrom([ 44, 8 ])


pixoo.drawTextLeft("APM", 0, colors.white, 0 )
pixoo.drawRect( [ 0, 6 ], [ 21, 63 ], colors.white, false )

pixoo.drawTextLeft("Syn", 0, colors.white, 21 )
pixoo.drawRect( [ 21, 6 ], [ 42, 63 ], colors.white, false )

pixoo.drawTextLeft("SLOs", 0, colors.white, 42 )
pixoo.drawRect( [ 42, 6 ], [ 63, 63 ], colors.white, false )

pixoo.push()

// for( var i=0; i <= 1000; i++ ) {
//  pixoo.drawPixel(
//    Math.floor(i / 64),
//    i % 64,
//    [0, 255, 0]
//  )
//   pixoo.push()
//   await sleep(1000)
// }


// while (true) {
//   const start = [ randomInt(64), randomInt(64) ]
//   const end = [ randomInt(64), randomInt(64) ]

//   const white = [ 255, 255, 255 ]
//   const color = [ randomInt(255), randomInt(255), randomInt(255) ]

//   pixoo.drawPixel( ...start, white )
//   pixoo.drawPixel( ...end, white )

//   // pixoo.drawLine( start, end, color )
//   pixoo.drawTextLeft("Foo", start[0], color, start[1] )
//   pixoo.drawTextRight("Bar", end[0], color, end[1] )
//   pixoo.push()

//   await sleep(1000)
// }
