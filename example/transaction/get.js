const pagseguro = require('../../src')
const config = require('../config')

const client = pagseguro.connect(config)
const transactionCode = ''

client.transaction.get(transactionCode)
    .then(data => console.log(data))
    .catch(error => console.error(error))
