import chai, { assert, expect } from 'chai'
import chaiParam, { param } from 'chai-param'
import config from './config'
import pagseguro from '../index'


describe('Authorization', function() {

    beforeEach(function() {
        this.params = {
            permissions: [
                'CREATE_CHECKOUTS',
                'SEARCH_TRANSACTIONS',
                'RECEIVE_TRANSACTION_NOTIFICATIONS',
                'MANAGE_PAYMENT_PRE_APPROVALS',
                'DIRECT_PAYMENT'
            ],

            redirecURL: 'http://domain.com',
            notificationURL: 'http://domain.com',
        }
    })

    it('success', async function() {

        const client = pagseguro.connect(config.pagseguro)
        const response = await client.authorization.request()

        expect(response).to.have.property('statusCode', 200)
        expect(response).to.have.property('status', 'success')
        expect(response).to.have.property('content')
        expect(response.content.code).to.have.length(32);
    })

    it('unauthorized', async function() {

        const configError = { ...config.pagseguro, appId: '', appKey: '', redirectURL: '' }
        const client = pagseguro.connect(configError)
        const response = await client.authorization.request()

        expect(response).to.have.property('statusCode', 400)
        expect(response).to.have.property('status', 'error')
        expect(response).to.have.property('content')
    })


    it.only('unsing person account', async function() {

        const client = pagseguro.connect(config.pagseguro)

        const params = {
            ...this.params,
            account: config.person
        }

        // console.log(params)

        const response = await client.authorization.request(params)

        expect(response).to.have.property('statusCode', 200)
        expect(response).to.have.property('status', 'success')
        expect(response).to.have.property('content')
        expect(response.content.code).to.have.length(32);
    })



})
