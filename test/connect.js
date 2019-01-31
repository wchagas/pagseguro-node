import chai, { assert, expect } from 'chai'
import chaiParam, { param } from 'chai-param'

import config from './config'
import pagseguro from '../index'


describe('Connect', function() {

	it('success', function() {
        const client = pagseguro.connect(config.pagseguro)
        expect(client).to.be.an('object')
        expect(client).to.have.property('session')
        expect(client).to.have.property('transaction')
    })

    it('throw if invalid params', function() {
        const configError = { ...config.pagseguro }
        delete configError.email

        expect(() => pagseguro.connect()).to.throw(TypeError)
        expect(() => pagseguro.connect(configError)).to.throw(TypeError)
    })

})
