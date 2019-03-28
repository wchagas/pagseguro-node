const pagseguro = require('../../src')
const config = require('../config')

const client = pagseguro.connect(config)
const transactionCode = ''
const refundValue = '10.00' // opcional :: Se não for informado, o PagSeguro assume que o valor a ser cancelado é o valor total da transação.

// Para que uma transação possa ser cancelada, no momento da requisição
// seu status deve ser: Paga (3), Disponível (4), Em disputa (5).
client.transaction.refund(transactionCode, refundValue)
    .then(data => console.log(data))
    .catch(error => console.error(error))
