// http://app.divoom-gz.com/Device/ReturnSameLANDevice
/* {
  "ReturnCode": 0,
  "ReturnMessage": "",
  "DeviceList": [
    {
      "DeviceName": "Pixoo64",
      "DeviceId": 300035631,
      "DevicePrivateIP": "192.168.1.163",
      "DeviceMac": "244cabca5ad8",
      "Hardware": 90
    }
  ]
} */

import fetch from 'cross-fetch'

const getIps = async () => {

  console.log("returning hard-coded ip of 192.168.1.163")
  // hard-coded for testing
  return ['192.168.1.163']

  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const resp = await fetch('http://app.divoom-gz.com/Device/ReturnSameLANDevice', options).catch(err => {
    console.error(err);
  });

  const result = await resp.json()
  console.log("result", result)

  if (result.errors) {
    console.log("Errors: ", result.errors)
    process.exit()
  }

  const ips = result.DeviceList.map(device => device.DevicePrivateIP) 
  console.log("IPs found: ", ips)

  if (ips.length == 0) {
    console.log("no ips found, exiting")
    process.exit()
  }

  return ips
}

export { getIps }
