import pagseguro from '../../'
import config from '../config'

const client = pagseguro.connect(config)

const data = {
    currency: 'BRL',
    //notificationURL: 'http://domain.com.br',
    //extraAmount: '0.00',
    reference: '100',
    sender: {
        //hash: '',
        name: 'Willy Chagas',
        email: config.emailSender,
        phone: {
            areaCode: 99,
            number: 991510980
        },
        document: {
            type: 'CPF',
            value: '18974411008'
        }
    },
    /*
    billing: {
        address: {
			street: 'Av João Lima',
			number: 55,
			complement: 'Casa',
			district: 'Campeche',
			city: 'Florianópolis',
			state: 'SC',
			country: 'BRA',
			postalCode: '88063333'
        }
    },*/
    shipping: {
        addressRequired: false,
    },
    /*shipping: {
        type: 3, // – PAC, 2 – SEDEX, 3 - Desconhecido
        cost: 0.00, // Valor do frete
        address: {
			street: 'Av João Lima',
			number: 55,
			complement: 'Casa',
			district: 'Campeche',
			city: 'Florianópolis',
			state: 'SC',
			country: 'BRA',
			postalCode: '88063333'
        }
    },*/
    items: [
        {
            id: 'prod1',
            description: 'Produto 1',
            amount: '10.00',
            quantity: 1
       },
       {
            id: 'prod2',
            description: 'Produto 2',
            amount: '13.00',
            quantity: 1
       },
    ]
}

client.transaction.boleto(data)
    .then(data => console.log(data))
    .catch(error => console.error(error))
