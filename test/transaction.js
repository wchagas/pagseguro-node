import chai, { assert, expect } from 'chai'
import config from './config'
import pagseguro from '../index'

let TRANSACTION_CODE = null

describe('Transaction', function() {
	
	beforeEach(function() {
        this.client = pagseguro.connect(config.pagseguro)
	})

 
    it('boleto', async function() {

        const response = await this.client.transaction.boleto(config.payment) 

        expect(response).to.be.an('object')
        expect(response).to.have.property('statusCode', 200)
        expect(response).to.have.property('status', 'success')
        expect(response).to.have.property('content')

		TRANSACTION_CODE = response.content.code
    })


	it('online debit', async function() {

        const response = await this.client.transaction.onlineDebit(config.payment) 

        expect(response).to.be.an('object')
        expect(response).to.have.property('statusCode', 200)
        expect(response).to.have.property('status', 'success')
        expect(response).to.have.property('content')
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

        const response = await this.client.transaction.get(TRANSACTION_CODE) 

        expect(response).to.be.an('object')
        expect(response).to.have.property('statusCode', 200)
        expect(response).to.have.property('status', 'success')
        expect(response).to.have.property('content')
    })


	it('search', async function() {

		const query = {
			initialDate: '2018-10-01T12:00',
			maxPageResults: 20, // maximo 20
			page: 1,
		}

        const response = await this.client.transaction.search(query) 

        expect(response).to.be.an('object')
        expect(response).to.have.property('statusCode', 200)
        expect(response).to.have.property('status', 'success')
        expect(response).to.have.property('content')
    })


	it('search by reference', async function() {

		const query = {
			reference: 'test_pagseguro_nodejs'
		}

        const response = await this.client.transaction.search(query) 

        expect(response).to.be.an('object')
        expect(response).to.have.property('statusCode', 200)
        expect(response).to.have.property('status', 'success')
        expect(response).to.have.property('content')
    })


	it('notification', async function() {
		
		const notificationCode = ''
        const response = await this.client.transaction.notification(notificationCode) 

        expect(response).to.be.an('object')
        expect(response).to.have.property('content')

		if (notificationCode) {
        	expect(response).to.have.property('statusCode', 200)
       	 	expect(response).to.have.property('status', 'success')
		} else {
			expect(response).to.have.property('statusCode', 400)
       	 	expect(response).to.have.property('status', 'error')
		}
    })


	it('cancel', async function() {

        const response = await this.client.transaction.cancel(TRANSACTION_CODE) 

        expect(response).to.be.an('object')
        expect(response).to.have.property('statusCode', 200)
        expect(response).to.have.property('status', 'success')
        expect(response).to.have.property('content')
    })

})

