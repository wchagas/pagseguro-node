import pagseguro from '../../'
import config from '../config'

const client = pagseguro.connect(config)

const data = {
    currency: 'BRL',
    //notificationURL: 'http://domain.com.br',
    //extraAmount: '0.00',
    //reference: 'Teste pagseguro nodejs',
    creditCard: {
        // Token retornado no serviço de obtenção de token do cartão de crédito (checkout transparente)
        token: '',
        installment: {

            // Valor das parcelas obtidas no serviço de opções de parcelamento
            value: '20.00',

            // Quantidade de parcelas escolhidas pelo cliente
            quantity: 4,

            // Quantidade de parcelas sem juros oferecidas ao cliente. O valor deve ser o
            // mesmo indicado no método getInstallments, no parâmetro
            // maxInstallmentNoInterest.
            noInterestInstallmentQuantity: 2
        },
        holder: {
            name: 'Willy Chagas',
            document: {
                type: 'CPF',
                value: '18974411008'
            },
            phone: {
                areaCode: 48,
                number: 991510980
            },
            birthDate: '22/02/1989'
        },
    },
    sender: {
        //hash: '',
        name: 'Willy Chagas',
        email: 'c48186756307979379590@sandbox.pagseguro.com.br',
        phone: {
            areaCode: 99,
            number: 991510980
        },
        document: {
            type: 'CPF',
            value: '18974411008'
        }
    },
    billing: {
		street: 'Av João Lima',
		number: 55,
		complement: 'Casa',
		district: 'Campeche',
		city: 'Florianópolis',
		state: 'SC',
		country: 'BRA',
		postalCode: '88063333'
    },
    shipping: {
        addressRequired: false,
    },
    /*shipping: {
        type: 3, // 1 – PAC, 2 – SEDEX, 3 - Desconhecido
        cost: 0.00, // Valor do frete
		street: 'Av João Lima',
		number: 55,
		complement: 'Casa',
		district: 'Campeche',
		city: 'Florianópolis',
		state: 'SC',
		country: 'BRA',
		postalCode: '88063333'
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


client.transaction.creditCard(data)
    .then(data => console.log(data))
    .catch(error => console.error(error))
