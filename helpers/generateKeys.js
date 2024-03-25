const crypto = require('crypto')

const key1 = crypto.randomBytes(32).toString('hex') // generate a random 25
const key2 = crypto.randomBytes(32).toString('hex') 
console.table({key1, key2})