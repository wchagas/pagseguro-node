import pagseguro from '../'
import config from './config'

const client = pagseguro.connect(config)

client.session.get()
    .then(data => console.log(data))
    .catch(error => console.error(error))
