import { PixooAPI } from 'pixoo-api'
import { sleep, randomInt } from './helpers.js'
import colors from './colors.js'
import { entities } from './data.js'

const pixoo = new PixooAPI(process.env.PIXOO_IP, 64)
await pixoo.initialize()

console.log("clearing display...")
pixoo.clear()
pixoo.fill(colors.black)

const fillFrom = (start, cols, rows) => {
  for (var i=0; i<cols; i++) {
    const col = start[0] + i*3
    for (var j=0; j<rows; j++) {
      const row = start[1] + j*3
      pixoo.drawRect( [ col, row ], [ col+2, row+2 ], colors.grey, true )
    }
  }
  pixoo.push()
}

const fillEntities = (entities, start, cols, rows) => {
  var next = 0
  for (var i=0; i<rows; i++) {
    const row = start[1] + i*3
    for (var j=0; j<cols; j++) {
      const col = start[0] + j*3
      var color = null
      if (entities.length <= next) {
        color = colors.black
      } else {
        const entity = entities[next]
        next++
        console.log(`${entity.name} is ${entity.alertSeverity}`)
        switch(entity.alertSeverity) {
          case 'CRITICAL': color = colors.red; break;
          case 'NOT_ALERTING': color = colors.green; break;
          case 'WARNING': color = colors.yellow; break;
          default: color = colors.grey;
        }
        // console.log(`${entity.name} (${entity.guid}) is ${color}`)
      }
      pixoo.drawRect( [ col, row ], [ col+2, row+2 ], color, true )
    }
  }
  pixoo.push()
}

console.log("filling display generically...")
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

const gatherAndDisplay = () => {

  console.log("gathering entities...")
  console.log("looking for applications...")
  entities(`accountId = ${process.env.ACCOUNT_ID} AND type IN ('APPLICATION')`).then(array => {
    console.log(array.length)
    const alertingEntities = array //array.filter(el => el.alertSeverity != 'NOT_CONFIGURED')

    console.log("entities count:", alertingEntities.length)

    fillEntities(alertingEntities, [2,8], 6, 18 )
    setTimeout(gatherAndDisplay, 10000)
  })

  console.log("looking for synthetics monitors...")
  entities(`accountId = ${process.env.ACCOUNT_ID} AND type IN ('MONITOR')`).then(array => {
    console.log(array.length)
    const alertingEntities = array //array.filter(el => el.alertSeverity != 'NOT_CONFIGURED')

    console.log("entities count:", alertingEntities.length)

    fillEntities(alertingEntities, [ 23, 8 ], 6, 8 )
    setTimeout(gatherAndDisplay, 60000)
  })

  console.log("looking for key transactions...")
  entities(`accountId = ${process.env.ACCOUNT_ID} AND type IN ('KEY_TRANSACTION')`).then(array => {
    console.log(array.length)
    const alertingEntities = array //array.filter(el => el.alertSeverity != 'NOT_CONFIGURED')

    console.log("entities count:", alertingEntities.length)

    fillEntities(alertingEntities, [ 23, 41 ], 6, 7 )
    setTimeout(gatherAndDisplay, 10000)
  })
}


gatherAndDisplay()
