import request from 'request-promise'
import config from '../config'
import PagseguroError from '../errors'
import * as format from '../format'


/**
 * formatRequestParams
 * @param {Object} opts
 * @param {Object} params
 * @ return {Object}
 */
const formatRequestParams = (opts, { ...params}) => {

  params.currency = 'BRL'
  params.shipping = format.shipping(params.shipping)
  params.sender = format.sender(params.sender)
  params.extraAmount = format.extraAmount(params.extraAmount)
  params.creditCard = format.creditCard(params.creditCard, params)
  params.billing = format.billing(params.billing)
  params.items = format.items(params.items)

  return params
}



/**
 * formatResponse
 * @param {Object} response
 * @param {String} method
 */
const formatResponse = (rs = {}, method) => {
    rs.method = method
    return rs
}



/**
 * boleto
 * @param {Object} opts
 * @param {Object} params
 * @ return {Promise}
 */
const boleto = (opts, params) => {

    params.method = 'boleto'
    params = formatRequestParams(opts, params)

    return request({
        ...opts,
        url: `${opts.base.webservice}/${config.transaction.directPayment}`,
        method: 'POST',
        body: opts.jsonToXml({ payment: params })
    })
    .then(data => ({
        ...data,
        content: formatResponse(data.content.transaction, 'boleto')
    }))
    .catch(e => e.response)
}



/**
 * creditCard
 * @param {Object} opts
 * @param {Object} params
 * @ return {Promise}
 */
const creditCard = (opts, params) => {

    params.method = 'creditCard'
    params = formatRequestParams(opts, params)

    return request({
        ...opts,
        url: `${opts.base.webservice}/${config.transaction.directPayment}`,
        method: 'POST',
        body: opts.jsonToXml({ payment: params })
    })
    .then(data => ({
        ...data,
        content: formatResponse(data.content.transaction, 'creditCard')
    }))
    .catch(e => e.response)
}



/**
 * onlineDebit
 * @param {Object} opts
 * @param {Object} params
 * @ return {Promise}
 */
const onlineDebit = (opts, params) => {

    params.method = 'EFT'
    params = formatRequestParams(opts, params)

    return request({
        ...opts,
        url: `${opts.base.webservice}/${config.transaction.directPayment}`,
        method: 'POST',
        body: opts.jsonToXml({ payment: params })
    })
    .then(data => ({
        ...data,
        content: formatResponse(data.content.transaction, 'onlineDebit')
    }))
    .catch(e => e.response)
}



/**
 * cancel
 * @param {Object} opts
 * @param {String} transactionCode
 * @ return {Promise}
 */
const cancel = (opts, transactionCode) => {

    opts.qs = {
        ...opts.qs,
        transactionCode
    }

    return request({
        ...opts,
        url: `${opts.base.webservice}/${config.transaction.cancel}`,
        method: 'POST',
    })
    .then(data => ({
        ...data,
        content: `Transação ${transactionCode} cancelada com sucesso.`
    }))
    .catch(e => e.response)
}



/**
 * refund
 * @param {Object} opts
 * @param {String} transactionCode
 * @param {Number} refundValue
 * @ return {Promise}
 */
const refund = (opts, transactionCode, refundValue = null) => {

    opts.qs = {
        ...opts.qs,
        transactionCode
    }

    if (refundValue) {
        opts.qs.refundValue = refundValue
    }

    return request({
        ...opts,
        url: `${opts.base.webservice}/${config.transaction.refund}`,
        method: 'POST',
    })
    .then(data => ({
        ...data,
        content: `Pedido de reembolso da transação  ${transactionCode} realizado com sucesso.`
    }))
    .catch(e => e.response)
}



/**
 * search
 * @param {Object} opts
 * @param {Object} query
 * @ return {Promise}
 */
const search = (opts, query = {}) => {

    opts.qs = {
        ...opts.qs,
        ...query
    }

    const response = data => {
        if (!data) {
            return {
                date: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString(),
                transactions: [],
                resultsInThisPage: 0,
                currentPage: 1,
                totalPages: 0
            }
        }

        return {
            ...data,
            transactions: data.transactions && data.transactions.transaction ? data.transactions.transaction : []
        }
    }

    return request({
        ...opts,
        url: `${opts.base.webservice}/${config.transaction.search}`,
        method: 'GET',
    })
    .then(data => ({
        ...data,
        content: response(data.content.transactionSearchResult)
    }))
    .catch(e => e.response)
}


/**
 * get
 * @param {Object} opts
 * @param {String} transactionCode
 * @ return {Promise}
 */
const get = (opts, transactionCode) => {

    return request({
        ...opts,
        url: `${opts.base.webservice}/${config.transaction.code}/${transactionCode}`,
        method: 'GET',
    })
    .then(data => ({
        ...data,
        content: data.content.transaction || null
    }))
    .catch(e => e.response)
}



/**
 * notification
 * @param {Object} opts
 * @ return {Promise}
 */
const notification = (opts, notificationCode) => {
    return request({
        ...opts,
        url: `${opts.base.webservice}/${config.transaction.notification}/${notificationCode}`,
        method: 'GET',
    })
    .then(data => ({
        ...data,
        content: data.content
    }))
    .catch(e => e.response)
}



/**
* exports
*/
module.exports = {
    boleto,
    creditCard,
    onlineDebit,
    cancel,
    refund,
    search,
    notification,
    get
}
