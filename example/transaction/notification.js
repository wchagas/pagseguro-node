const pagseguro = require('../../lib')
const config = require('../config')

const client = pagseguro.connect(config)

// @link https://pagseguro.uol.com.br/v2/guia-de-integracao/api-de-notificacoes.html
const notificationCode = ''

client.transaction.notification(notificationCode)
    .then(data => console.log(data))
    .catch(error => console.error(error))
