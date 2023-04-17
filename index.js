import { PixooAPI } from 'pixoo-api'
import { sleep, randomInt } from './helpers.js'
import colors from './colors.js'

const pixoo = new PixooAPI('192.168.1.56', 64)
await pixoo.initialize()

pixoo.clear()
pixoo.fill(colors.black)

const fillFrom = (start, cols, rows) => {
  for (var i=0; i<cols; i++) {
    const col = start[0] + i*3
    for (var j=0; j<rows; j++) {
      const row = start[1] + j*3
      pixoo.drawRect( [ col, row ], [ col+2, row+2 ], colors.green, true )
    }
  }
  pixoo.push()
}

fillFrom([ 2, 8 ], 6, 18)
fillFrom([ 23, 8 ], 6, 8)
fillFrom([ 23, 41 ], 6, 7)
fillFrom([ 44, 8 ], 6, 18 )


pixoo.drawTextLeft("APM", 1, colors.white, 1 )
pixoo.drawRect( [ 0, 6 ], [ 21, 63 ], colors.grey, false )

pixoo.drawTextLeft("SYN", 1, colors.white, 22 )
pixoo.drawRect( [ 21, 6 ], [ 42, 33 ], colors.grey, false )

pixoo.drawTextLeft("KTs", 34, colors.white, 22 )
pixoo.drawRect( [ 21, 39 ], [ 42, 63 ], colors.grey, false )

pixoo.drawTextLeft("SLOs", 1, colors.white, 43 )
pixoo.drawRect( [ 42, 6 ], [ 63, 63 ], colors.grey, false )

pixoo.push()
