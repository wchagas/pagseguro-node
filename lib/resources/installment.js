import request from 'request-promise'
import config from '../config'

const get = (opts, { ...params }) => {

    if (params.amount && params.amount.toFixed) {
        params.amount = params.amount.toFixed(2)
    }

    opts.qs = {
        ...opts.qs,
        ...params
    }

    return request({
        ...opts,
        url: `${opts.base.webservice}/${config.installment}`,
        method: 'GET'
    }).then(data => {
        return {
            ...data,
            content: data.content ? data.content.installments.installment : []
        }
    }).catch(e => e.response)
}

module.exports = {
    get
}
