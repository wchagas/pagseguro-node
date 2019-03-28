const config = require('./config')
const pagseguro = require('../src')

describe('Installment', function() {

    it('success', async function() {

        const client = pagseguro.connect(config.pagseguro)
        const response = await client.installment.get({
            'amount': 30.00,
            'cardBrand': 'visa',
            'maxInstallmentNoInterest': 2
        })

    		expect(typeof response).toEqual('object')
    		expect(response).toHaveProperty('statusCode', 200)
    		expect(response).toHaveProperty('status', 'success')
    		expect(response).toHaveProperty('content')
    		expect(Array.isArray(response.content)).toEqual(true)
    })



    it('invalid cardBrand', async function() {
  		try {
  			const client = pagseguro.connect(config.pagseguro)
  			const response = await client.installment.get({
  				'amount': 30.00,
  				'cardBrand': 'other',
  				'maxInstallmentNoInterest': 2
  			})
  		} catch(e) {
  			expect(typeof e).toEqual('object')
  			expect(e).toHaveProperty('name', 'PagseguroError')
  			expect(e).toHaveProperty('status', 'error')
  			expect(e).toHaveProperty('statusCode', 400)
  			expect(e).toHaveProperty('content')
  			expect(Array.isArray(e.content)).toEqual(true)
  		}
    })


	it('invalid amount', async function() {
		try {
			const client = pagseguro.connect(config.pagseguro)
			const response = await client.installment.get({
				'amount': null,
				'cardBrand': 'visa',
				'maxInstallmentNoInterest': 2
			})
		} catch(e) {
			expect(typeof e).toEqual('object')
			expect(e).toHaveProperty('name', 'PagseguroError')
			expect(e).toHaveProperty('status', 'error')
			expect(e).toHaveProperty('statusCode', 400)
			expect(e).toHaveProperty('content')
			expect(Array.isArray(e.content)).toEqual(true)
		}
    })


	it('invalid maxInstallmentNoInterest', async function() {
		try {
			const client = pagseguro.connect(config.pagseguro)
			const response = await client.installment.get({
				'amount': 12.00,
				'cardBrand': 'visa',
				'maxInstallmentNoInterest': 2222
			})
		} catch(e) {
			expect(typeof e).toEqual('object')
			expect(e).toHaveProperty('name', 'PagseguroError')
			expect(e).toHaveProperty('status', 'error')
			expect(e).toHaveProperty('statusCode', 400)
			expect(e).toHaveProperty('content')
			expect(Array.isArray(e.content)).toEqual(true)
		}
    })


 })
