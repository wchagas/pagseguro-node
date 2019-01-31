import chai, { assert, expect } from 'chai'
import chaiParam, { param } from 'chai-param'
import config from './config'
import pagseguro from '../index'


describe('Installment', function() {
    
    it('success', async function() {
        
        const client = pagseguro.connect(config.pagseguro)
    
        const query = {
            'amount': 30.00,
            'cardBrand': 'visa',
            'maxInstallmentNoInterest': 2
        }
        
        const response = await client.installment.get(query)
        
        assert.typeOf(response.content, 'array')
        expect(response).to.have.property('statusCode', 200)
        expect(response).to.have.property('status', 'success')
        expect(response).to.have.property('content')
    })

 })
