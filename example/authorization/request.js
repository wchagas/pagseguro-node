import pagseguro from '../../'
import config from '../config'

const client = pagseguro.connect(config)

const params = {
    
    permissions: [
        'CREATE_CHECKOUTS',
        'SEARCH_TRANSACTIONS',
        'RECEIVE_TRANSACTION_NOTIFICATIONS',
        'MANAGE_PAYMENT_PRE_APPROVALS',
        'DIRECT_PAYMENT'
    ],
    
    redirecURL: 'http://domain.com'
    notificationURL: 'http://domain.com'
}




client.authorization.request(params)
    .then(data => console.log(data))
    .catch(error => console.error(error))
