const config = require('./config')
const pagseguro = require('../src')

describe('Connect', function() {


	it('success', function() {
        const client = pagseguro.connect(config.pagseguro)
		expect(typeof client).toEqual('object')
		expect(client).toHaveProperty('session')
		expect(client).toHaveProperty('transaction')
    })



	it('throw if empty params', function() {
		try {
			pagseguro.connect()
		} catch (e) {
			expect(e).toBeInstanceOf(TypeError)
		}
    })



    it('throw if invalid params', function() {
		const configError = { ...config.pagseguro }
		delete configError.email
		try {
			pagseguro.connect(configError)
		} catch (e) {
			expect(e).toBeInstanceOf(TypeError)
		}
    })

})
