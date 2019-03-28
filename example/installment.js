const pagseguro = require('../lib')
const config = require('./config')

const client = pagseguro.connect(config)

const query = {
    'amount': 30.00,
    'cardBrand': 'visa',
    'maxInstallmentNoInterest': 2
}

client.installment.get(query)
    .then(data => console.log(data))
    .catch(error => console.error(error))
