const request = require('request-promise')
const config = require('../config')
const PagseguroError = require('../Error')

const get = async (opts, { ...params }) => {

    if (params.amount && params.amount.toFixed) {
        params.amount = params.amount.toFixed(2)
    }

    opts.qs = {
        ...opts.qs,
        ...params
    }

	try {

	    const response = await request({
	        ...opts,
	        url: `${opts.base.webservice}/${config.installment}`,
	        method: 'GET'
	    })

		return {
			...response,
			content: response.content ? response.content.installments.installment : []
		}

	} catch({ response }) {
		throw new PagseguroError(response)
	}

}

module.exports = {
    get
}
