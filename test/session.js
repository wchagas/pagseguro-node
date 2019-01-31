import chai, { assert, expect } from 'chai'
import chaiParam, { param } from 'chai-param'
import config from './config'
import pagseguro from '../index'


describe('Session', function() {
    
    it('success', async function() {
        
        const client = pagseguro.connect(config.pagseguro)
        const session = await client.session.get()    
        
        assert.typeOf(session.content, 'string')
        expect(session).to.have.property('statusCode', 200)
        expect(session).to.have.property('status', 'success')
        expect(session).to.have.property('content')
        expect(session.content).to.have.length(32);
    })
    
    it('unauthorized', async function() {

        const configError = { ...config.pagseguro, email: '', token: '' }
        const client = pagseguro.connect(configError)
        const session = await client.session.get() 

        expect(session).to.have.property('statusCode', 401)
        expect(session).to.have.property('status', 'error')
        expect(session).to.have.property('content')
    })

})
