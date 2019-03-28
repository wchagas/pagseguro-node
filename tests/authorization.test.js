const config = require('./config')
const pagseguro = require('../lib')

describe('Authorization', function() {



    it('success', async function() {

        const client = pagseguro.connect(config.pagseguro)
        const response = await client.authorization.request()

		expect(typeof response).toEqual('object')
		expect(response).toHaveProperty('statusCode', 200)
		expect(response).toHaveProperty('status', 'success')
		expect(response).toHaveProperty('content')
		expect(response.content).toHaveProperty('code')
		expect(response.content.code).toHaveLength(32)
    })



    it('unauthorized', async function() {

		try {
	        const configError = { ...config.pagseguro, appId: '', appKey: '', redirectURL: '' }
	        const client = pagseguro.connect(configError)
	        const response = await client.authorization.request()
		} catch(e) {
			expect(typeof e).toEqual('object')
			expect(e).toHaveProperty('name', 'PagseguroError')
			expect(e).toHaveProperty('status', 'error')
			expect(e).toHaveProperty('statusCode', 400)
			expect(e).toHaveProperty('content')
			expect(Array.isArray(e.content)).toEqual(true)
		}

    })



    // it.only('unsing person account', async function() {
	//
    //     const client = pagseguro.connect(config.pagseguro)
	//
    //     const params = {
    //         ...this.params,
    //         account: config.person
    //     }
	//
    //     // console.log(params)
	//
    //     const response = await client.authorization.request(params)
	//
    //     expect(response).to.have.property('statusCode', 200)
    //     expect(response).to.have.property('status', 'success')
    //     expect(response).to.have.property('content')
    //     expect(response.content.code).to.have.length(32);
    // })



})
