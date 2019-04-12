const config = require('./config')
const pagseguro = require('../src')


let TRANSACTION_CODE = null

describe('Transaction', function() {

	const client = pagseguro.connect(config.pagseguro)


    it('boleto', async function() {

		const data = { ...config.payment }
		delete data.creditCard
		delete data.bank

        const response = await client.transaction.boleto(data)

		expect(typeof response).toEqual('object')
		expect(response).toHaveProperty('statusCode', 200)
		expect(response).toHaveProperty('status', 'success')
		expect(response).toHaveProperty('content')

		TRANSACTION_CODE = response.content.code
    })


	it('online debit', async function() {

        const response = await client.transaction.onlineDebit(config.payment)

		expect(typeof response).toEqual('object')
		expect(response).toHaveProperty('statusCode', 200)
		expect(response).toHaveProperty('status', 'success')
		expect(response).toHaveProperty('content')

		TRANSACTION_CODE = response.content.code
    })


	/*
	TODO: get token?
	it('credit card', async function() {
        this.timeout(10000)

        const client = pagseguro.connect(config.pagseguro)
        const response = await client.transaction.creditCard(config.payment)

        expect(response).to.be.an('object')
        expect(response).to.have.property('statusCode', 200)
        expect(response).to.have.property('status', 'success')
        expect(response).to.have.property('content')
    })
	*/

	it('get', async function() {

        const response = await client.transaction.get(TRANSACTION_CODE)

		expect(typeof response).toEqual('object')
		expect(response).toHaveProperty('statusCode', 200)
		expect(response).toHaveProperty('status', 'success')
		expect(response).toHaveProperty('content')
    })


	it('search', async function() {

        const response = await client.transaction.search({
			initialDate: '2019-01-01T12:00',
			maxPageResults: 20, // maximo 20
			page: 1,
		})

		expect(typeof response).toEqual('object')
		expect(response).toHaveProperty('statusCode', 200)
		expect(response).toHaveProperty('status', 'success')
		expect(response).toHaveProperty('content')
    })


	it('search by reference', async function() {

        const response = await client.transaction.search({
			reference: 'test_pagseguro_nodejs'
		})

		expect(typeof response).toEqual('object')
		expect(response).toHaveProperty('statusCode', 200)
		expect(response).toHaveProperty('status', 'success')
		expect(response).toHaveProperty('content')
    })


	it('notification', async function() {
		try {
			const notificationCode = ''
	        const response = await client.transaction.notification(notificationCode)
		} catch(e) {
			expect(typeof e).toEqual('object')
			expect(e).toHaveProperty('name', 'PagseguroError')
			expect(e).toHaveProperty('status', 'error')
			expect(e).toHaveProperty('statusCode', 400)
			expect(e).toHaveProperty('content')
			expect(Array.isArray(e.content)).toEqual(true)
		}
    })


	it('cancel', async function() {

        const response = await client.transaction.cancel(TRANSACTION_CODE)

		expect(typeof response).toEqual('object')
		expect(response).toHaveProperty('statusCode', 200)
		expect(response).toHaveProperty('status', 'success')
		expect(response).toHaveProperty('content')
    })

})
