/**
 * pagseguro
 */
const pagseguro = {
  email: '',
  senderEmail: '', // user@sandbox.pagseguro.com.br
  token: '',
  appId: '',
  appKey: '',
  env: 'sandbox',
  log: __dirname + '/log/pagseguro.log',
  debug: false,
  notificationURL: '',
  redirectURL: ''
}


/**
 * acounts
 */
const accounts = [
    {
        name: 'Vendedor 01',
        email: '',
        password: '',
        publicKey: ''
    },
    {
        name: 'Vendedor 02',
        email: '',
        password: '',
        publicKey: ''
    },
    {
        name: 'Vendedor 03',
        email: '',
        password: '',
        publicKey: ''
    }
]



/**
* sender
*/
const sender = {
	name: 'Willy Chagas',
	email: 'chagaswc89@gmail.com',
	phone: {
		areaCode: '48',
		number: '91510980',
	},
	document: {
		type: 'CPF',
		value: '18974411008'
	},
}



/**
 * address
 */
const address = {
	street: 'Av João Lima',
	number: 55,
	complement: 'Casa',
	district: 'Campeche',
	city: 'Florianópolis',
	state: 'SC',
	country: 'BRA',
	postalCode: '88063333'
}



/**
* billing
*/
const billing = { ...address }



/**
* shipping
*/
const shipping = {
	...address,
	type: 1,
	cost: 25.00
}



/**
* items
*/
const items = [
	{
		id: 1,
		description: 'Produto 1',
		quantity: 2,
		amount: 2,
	},
	{
		id: 2,
		description: 'Produto 2',
		quantity: 1,
		amount: 60.00,
	},
	{
		id: 3,
		description: 'Produto 3',
		quantity: 2,
		amount: 20.00,
	}
]



/**
* holder
*/
const holder = {
	...sender,
	birthDate:"22/02/1989",
}



/**
* installment
*/
const installment = {
	installmentAmount: 124,
	interestFree: true,
	quantity: 1,
	totalAmount: 124.00
}




/**
 * person
 */
const person = {
    email: accounts[0].email,
    type: 'SELLER',
    person: {
        name: accounts[0].name,
        documents: [
            {
                type: 'CPF',
                value: '18974411008'
            }
        ],
        phones: [
            {
                type: 'MOBILE',
                areaCode: '48',
                number: '91510980',
            },
            {
                type: 'HOME',
                areaCode: '48',
                number: '32091243',
            }
        ],
        address
    }
}




/**
 * company
 */
const company = {
    email: accounts[1].email,
    type: 'COMPANY',
    company: {
        name: accounts[1].name,
        displayName: 'Atah Digital',
        websiteURL: 'http://atah.com.br',
        documents: [
            {
                type: 'CNPJ',
                value: '17302417000101'
            }
        ],
        partner: {
            name: 'Willy Chagas',
            documents: [
                {
                    type: 'CPF',
                    value: '18974411008'
                }
            ],
            birthDate: '22/02/1989'
        },
        phones: [
            {
                type: 'BUSINESS',
                areaCode: '48',
                number: '91510980',
            },
            {
                type: 'BUSINESS',
                areaCode: '48',
                number: '32091243',
            }
        ],
        address
    }
}



/**
* exports
*/
module.exports = {
    pagseguro,
    accounts,
    person,
    company,
	payment: {
		bank: {
			name: 'itau'
		},
		creditCard: {
			holder,
			installment,
			maxInstallmentNoInterest: 0,
			token: "",
		},
		extraAmount: 10.00,
		reference: 'test_pagseguro_nodejs',
		sender,
		shipping,
		billing,
		items
	}
}
