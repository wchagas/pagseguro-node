import clone from 'clone'
import * as validate from './validate'
import ip from 'ip'


/**
 * sender
 * @param {Object} sender
 * @return {Object}
 */
function sender(s) {

	if (!validate.isObject(s)) {
		return {}
	}

	s = clone(s)

	if (s.document) {
        s.documents = {
            document: s.document || {}
        }
		delete s.document
    }

	s.ip = ip.address()

	return s
}



/**
 * creditCard
 * @param {Object} creditCard
 * @param {Object} params
 * @return {Object}
 */
function creditCard(c, params = {}) {

	if (!validate.isObject(c)) {
		return {}
	}

	c = clone(c)

    if (c.holder && validate.isObject(c.holder)) {
        c.holder.documents = {
            document: c.holder.document || {}
        }

		if (c.holder.document) delete c.holder.document
    }

    if (c.installment) {
        const { installmentAmount } = c.installment

        c.installment = {
            quantity: c.installment.quantity,
        }

        if (installmentAmount && installmentAmount.toFixed) {
            c.installment.value = installmentAmount.toFixed(2)
        }

        if (c.maxInstallmentNoInterest && c.maxInstallmentNoInterest > 1) {
            c.installment.noInterestInstallmentQuantity = c.maxInstallmentNoInterest
        }
    }

    if (params.billing) {
        c.billingAddress = params.billing || {}
    } else {
		c.billingAddress = {}
	}


    return c
}



/**
 * billing
 * @param {Object} billing
 * @return {Object}
 */
function billing(b) {

	b = clone(b)

	if (!validate.isObject(b)) {
		return { addressRequired: false }
	}

	if (b.hasOwnProperty('addressRequired') && b.addressRequired == false) {
		return { addressRequired: false }
	}

	if (Object.keys(b).length == 0) {
		return { addressRequired: false }
	}

	return { address: b }
}



/**
 * shipping
 * @param {Object} shipping
 * @return {Object}
 */
function shipping(s) {

	if (!validate.isObject(s)) {
		return { addressRequired: false }
	}

	s = clone(s)

	if (s.hasOwnProperty('addressRequired') && s.addressRequired == false) {
		return { addressRequired: false }
	}

	if (Object.keys(s).length == 0) {
		return { addressRequired: false }
	}

	const result = { address: s }

	if (s.type) {
		result.type = s.type
	}

	if (s.cost) {
		result.cost = s.cost.toFixed ? s.cost.toFixed(2) : s.cost
	}

	return result
}



/**
 * extraAmount
 * @param {Number} extraAmount
 * @return {Object}
 */
function extraAmount(e) {

    if (e && e.toFixed) {
        e = e.toFixed(2)
    }

	return e
}



/**
 * items
 * @param {Array} item
 * @return {Object}
 */
function items(i) {

	if (!validate.isArray(i)) {
		return { item: [] }
	}

	i = clone(i)

    return {
        item: i.map(item => {
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
function permissions(p) {

	if (!validate.isArray(p)) {
		return { code: p }
	}

    return {
        code: p
    }
}



/**
 * person
 * @param {Object} account
 * @return {Object}
 */
function person(p) {

	if (!validate.isObject(p)) {
		return {}
	}

    p = clone(p)


    return p
}



/**
 * company
 * @param {Object} account
 * @return {Object}
 */
function company(c) {

	if (!validate.isObject(c)) {
		return {}
	}

    c = clone(c)


    return c
}




/**
 * account
 * @param {Object} account
 * @return {Object}
 */
function account(a) {

	if (!validate.isObject(a)) {
		return {}
	}

    switch(a.type) {
        case 'PERSON':
            return person(a)
            break
        case 'COMPANY':
            return company(a)
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
