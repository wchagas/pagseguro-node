const clone = require('clone')
const validate = require('./validate')
const ip = require('ip')


/**
 * sender
 * @param {Object} sender
 * @return {Object}
 */
function sender(sender) {

	if (!validate.isObject(sender)) {
		return {}
	}

	sender = clone(sender)

	if (sender.document) {
        sender.documents = {
            document: sender.document || {}
        }
		delete sender.document
    }

	sender.ip = ip.address()

	return sender
}



/**
 * creditCard
 * @param {Object} creditCard
 * @param {Object} params
 * @return {Object}
 */
function creditCard(creditCard, params = {}) {

	if (!validate.isObject(creditCard)) {
		return {}
	}

	creditCard = clone(creditCard)

    if (creditCard.holder && validate.isObject(creditCard.holder)) {
        creditCard.holder.documents = {
            document: creditCard.holder.document || {}
        }

		if (creditCard.holder.document) delete creditCard.holder.document
    }

    if (creditCard.installment) {
        const { installmentAmount } = creditCard.installment

        creditCard.installment = {
            quantity: creditCard.installment.quantity,
        }

        if (installmentAmount && installmentAmount.toFixed) {
            creditCard.installment.value = installmentAmount.toFixed(2)
        }

        if (creditCard.maxInstallmentNoInterest && creditCard.maxInstallmentNoInterest > 1) {
            creditCard.installment.noInterestInstallmentQuantity = creditCard.maxInstallmentNoInterest
        }
    }

    if (params.billing) {
        creditCard.billingAddress = params.billing || {}
    } else {
		creditCard.billingAddress = {}
	}


    return creditCard
}



/**
 * billing
 * @param {Object} billing
 * @return {Object}
 */
function billing(billing) {

	billing = clone(billing)

	if (!validate.isObject(billing)) {
		return { addressRequired: false }
	}

	if (billing.hasOwnProperty('addressRequired') && billing.addressRequired == false) {
		return { addressRequired: false }
	}

	if (Object.keys(billing).length == 0) {
		return { addressRequired: false }
	}

	return { address: billing }
}



/**
 * shipping
 * @param {Object} shipping
 * @return {Object}
 */
function shipping(shipping) {

	if (!validate.isObject(shipping)) {
		return { addressRequired: false }
	}

	shipping = clone(shipping)

	if (shipping.hasOwnProperty('addressRequired') && shipping.addressRequired == false) {
		return { addressRequired: false }
	}

	if (Object.keys(shipping).length == 0) {
		return { addressRequired: false }
	}

	const newShipping = { address: shipping }

	if (shipping.type) {
		newShipping.type = shipping.type
	}

	if (shipping.cost) {
		newShipping.cost = shipping.cost.toFixed ? shipping.cost.toFixed(2) : shipping.cost
	}

	return newShipping
}



/**
 * extraAmount
 * @param {Number} extraAmount
 * @return {Object}
 */
function extraAmount(extraAmount) {

    if (extraAmount && extraAmount.toFixed) {
        extraAmount = extraAmount.toFixed(2)
    }

	return extraAmount
}



/**
 * items
 * @param {Array} item
 * @return {Object}
 */
function items(items) {

	if (!validate.isArray(items)) {
		return { item: [] }
	}

	items = clone(items)

    return {
        item: items.map(item => {
            if (item.amount && item.amount.toFixed) {
                item.amount = item.amount.toFixed(2)
            }
            return item
        })
    }
}



/**
 * permissions
 * @param {Array} permissions
 * @return {Object}
 */
function permissions(permissions) {

	if (!validate.isArray(permissions)) {
		return { code: permissions }
	}

    return {
        code: permissions
    }
}



/**
 * person
 * @param {Object} person
 * @return {Object}
 */
function person(person) {

	if (!validate.isObject(person)) {
		return {}
	}

    person = clone(person)

    return person
}



/**
 * company
 * @param {Object} company
 * @return {Object}
 */
function company(company) {

	if (!validate.isObject(company)) {
		return {}
	}

    company = clone(company)

    return company
}




/**
 * account
 * @param {Object} account
 * @return {Object}
 */
function account(a) {

	if (!validate.isObject(account)) {
		return {}
	}

    switch(account.type) {
        case 'PERSON':
            return person(account)
            break
        case 'COMPANY':
            return company(account)
            break
        default:
            return {}

    }
}



/**
 * exports
 */
module.exports = {
	sender,
    creditCard,
	shipping,
	billing,
	items,
    extraAmount,
    permissions,
    account
}
