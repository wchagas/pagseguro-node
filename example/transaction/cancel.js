import pagseguro from '../../'
import config from '../config'

const client = pagseguro.connect(config)
const transactionCode = ''

client.transaction.cancel(transactionCode)
    .then(data => console.log(data))
    .catch(error => console.error(error))
