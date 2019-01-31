const pagseguro = require('../../')
import config from '../config'

const client = pagseguro.connect(config)

const query = {
    initialDate: '2018-10-01T12:00',
    // finalDate: '2018-11-01T12:00', // intervalo de no máximo 30 dias
    maxPageResults: 20, // maximo 20
    page: 1,
    //reference: 'Teste Pagseguro React'
}

client.transaction.search(query)
    .then(data => console.log(data))
    .catch(error => console.error(error))
