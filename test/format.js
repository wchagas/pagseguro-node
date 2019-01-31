import chai, { assert, expect } from 'chai'
import chaiParam, { param } from 'chai-param'
import clone from 'clone'
import config from './config'
import pagseguro from '../index'



describe('Format', function() {



	/**
	* sender
	*/
	describe('sender', function() {
		it('insert into document in documents', function() {
			const formatted = pagseguro.format.sender(config.payment.sender)
			expect(formatted.documents.document).to.deep.equal(config.payment.sender.document)
		})
	})



	/**
	* CreditCard
	*/
	describe('creditCard', function() {

        beforeEach(function() {
			this.formatted = pagseguro.format.creditCard(config.payment.creditCard, config.payment)
		})

		it('return formatted object', function() {
			expect(this.formatted).to.contain.keys('holder', 'installment', 'maxInstallmentNoInterest', 'token');
			expect(this.formatted.holder).to.contain.keys('name', 'email', 'phone', 'birthDate', 'documents');
			expect(this.formatted.installment).to.contain.keys('quantity', 'value');
			expect(this.formatted.holder.documents.document).to.deep.equal(config.payment.creditCard.holder.document)
			expect(this.formatted.installment.value).to.deep.equal(config.payment.creditCard.installment.totalAmount.toFixed(2))
		})

		it('insert into document in documents', function() {
			expect(this.formatted.holder.documents.document).to.deep.equal(config.payment.creditCard.holder.document)
			expect(this.formatted.installment.value).to.deep.equal(config.payment.creditCard.installment.totalAmount.toFixed(2))
		})

		it('total amount formatted to 00.00', function() {
			expect(this.formatted.installment.value).to.deep.equal(config.payment.creditCard.installment.totalAmount.toFixed(2))
		})

		it('set billing address', function() {
			const configPayment = clone(config.payment)			
			let formatted = pagseguro.format.creditCard(configPayment.creditCard, configPayment)
			
			configPayment.billing = { addressRequired: false }
			formatted = pagseguro.format.creditCard(configPayment.creditCard, configPayment)
			expect(formatted.billingAddress).to.have.property('addressRequired', false)
		
			delete configPayment.billing
			formatted = pagseguro.format.creditCard(configPayment.creditCard, configPayment)
			expect(formatted.billingAddress).to.deep.equal({});
		})
	
	})



	/**
	* billing
	*/
	describe('billing', function() {

		it('set addressRequired to false if empty object', function() {
			const formatted = pagseguro.format.billing({})
			expect(formatted).to.have.property('addressRequired', false)
		})

		it('set addressRequired to false if parameter is not object', function() {
			const formatted = pagseguro.format.billing()
			expect(formatted).to.have.property('addressRequired', false)
		})

		it('if success return an equal object', function() {
			const formatted = pagseguro.format.billing(config.payment.billing)
			expect(formatted.address).to.deep.equal(config.payment.billing)
		})
	
	})
   

	
	/**
	* shipping
	*/
	describe('shipping', function() {

		it('set addressRequired to false if empty object', function() {
			const formatted = pagseguro.format.shipping({})
			expect(formatted).to.have.property('addressRequired', false)
		})

		it('set addressRequired to false if parameter is not object', function() {
			const formatted = pagseguro.format.shipping()
			expect(formatted).to.have.property('addressRequired', false)
		})

		it('if success return an equal object', function() {
			const formatted = pagseguro.format.shipping(config.payment.shipping)
			expect(formatted.address).to.deep.equal(config.payment.shipping)
		})

		it('cost formatted to 00.00', function() {
			const formatted = pagseguro.format.shipping(config.payment.shipping)
			expect(formatted.cost).to.deep.equal(config.payment.shipping.cost.toFixed(2))
		})
	
	})



	/**
	* items
	*/
	describe('items', function() {
		
		it('return item with empty array if parameter is not array', function() {
			const formatted = pagseguro.format.items()
			expect(formatted.item).to.deep.equal([])
		})

		it('return formatted object with array', function() {
			const formatted = pagseguro.format.items(config.payment.items)
        	expect(formatted).to.have.property('item')
        	expect(formatted.item).to.be.an('array')
		})
		
		it('format item amount to 00.00', function() {
			const formatted = pagseguro.format.items(config.payment.items)
        	expect(formatted.item[0].amount).to.deep.equal(config.payment.items[0].amount.toFixed(2))
		})
	})


})
