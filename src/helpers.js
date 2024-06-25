
const sleep = ms => new Promise(r => setTimeout(r, ms));
const randomInt = (max) => Math.floor(Math.random() * max)

const helpers = { sleep, randomInt }

export default helpers
export { sleep, randomInt }
