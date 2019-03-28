const config = require('./config')
const pagseguro = require('../src')
const clone = require('clone')

describe('Format', function() {



	/**
	* sender
	*/
	describe('sender', function() {
		it('insert into document in documents', function() {
			const formatted = pagseguro.format.sender(config.payment.sender)
			expect(formatted.documents.document).toEqual(config.payment.sender.document)
		})
	})



	/**
	* CreditCard
	*/
	describe('creditCard', function() {

		const formatted = pagseguro.format.creditCard(config.payment.creditCard, config.payment)

		it('return formatted object', function() {
			expect(Object.keys(formatted).sort()).toEqual(['billingAddress', 'holder', 'installment', 'maxInstallmentNoInterest', 'token']);
			expect(Object.keys(formatted.holder).sort()).toEqual(['birthDate', 'documents', 'email', 'name', 'phone']);
			expect(Object.keys(formatted.installment).sort()).toEqual(['quantity', 'value']);
		})

		it('insert into document in documents', function() {
			expect(formatted.holder.documents.document).toEqual(config.payment.creditCard.holder.document)
		})

		it('total amount formatted to 00.00', function() {
			expect(formatted.installment.value).toEqual(config.payment.creditCard.installment.totalAmount.toFixed(2))
		})

		it('set billing address', function() {
			const configPayment = clone(config.payment)
			let _formatted = pagseguro.format.creditCard(configPayment.creditCard, configPayment)

			configPayment.billing = { addressRequired: false }
			_formatted = pagseguro.format.creditCard(configPayment.creditCard, configPayment)
			expect(_formatted.billingAddress).toHaveProperty('addressRequired', false)

			delete configPayment.billing
			_formatted = pagseguro.format.creditCard(configPayment.creditCard, configPayment)
			expect(_formatted.billingAddress).toEqual({});
		})

	})



	/**
	* billing
	*/
	describe('billing', function() {

		it('set addressRequired to false if empty object', function() {
			const formatted = pagseguro.format.billing({})
			expect(formatted).toHaveProperty('addressRequired', false)
		})

		it('set addressRequired to false if parameter is not object', function() {
			const formatted = pagseguro.format.billing()
			expect(formatted).toHaveProperty('addressRequired', false)
		})

		it('if success return an equal object', function() {
			const formatted = pagseguro.format.billing(config.payment.billing)
			expect(formatted.address).toEqual(config.payment.billing)
		})

	})



	/**
	* shipping
	*/
	describe('shipping', function() {

		it('set addressRequired to false if empty object', function() {
			const formatted = pagseguro.format.shipping({})
			expect(formatted).toHaveProperty('addressRequired', false)
		})

		it('set addressRequired to false if parameter is not object', function() {
			const formatted = pagseguro.format.shipping()
			expect(formatted).toHaveProperty('addressRequired', false)
		})

		it('if success return an equal object', function() {
			const formatted = pagseguro.format.shipping(config.payment.shipping)
			expect(formatted.address).toEqual(config.payment.shipping)
		})

		it('cost formatted to 00.00', function() {
			const formatted = pagseguro.format.shipping(config.payment.shipping)
			expect(formatted.cost).toEqual(config.payment.shipping.cost.toFixed(2))
		})

	})



	/**
	* items
	*/
	describe('items', function() {

		it('return item with empty array if parameter is not array', function() {
			const formatted = pagseguro.format.items()
			expect(formatted.item).toEqual([])
		})

		it('return formatted object with array', function() {
			const formatted = pagseguro.format.items(config.payment.items)
        	expect(formatted).toHaveProperty('item')
        	expect(Array.isArray(formatted.item)).toEqual(true)
		})

		it('format item amount to 00.00', function() {
			const formatted = pagseguro.format.items(config.payment.items)
        	expect(formatted.item[0].amount).toEqual(config.payment.items[0].amount.toFixed(2))
		})
	})


})
