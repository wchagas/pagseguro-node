import requestP from 'request-promise'
import config from '../config'
import format from '../format'

const PERMISSIONS = [
    'CREATE_CHECKOUTS',
    'SEARCH_TRANSACTIONS',
    'RECEIVE_TRANSACTION_NOTIFICATIONS',
    'MANAGE_PAYMENT_PRE_APPROVALS',
    'DIRECT_PAYMENT'
]

const request = (opts, params = {}) => {

    const query = {
        appId: opts.appId,
        appKey: opts.appKey
    }

    const body = {
        notificationURL: params.notificationURL || opts.notificationURL,
        redirectURL: params.redirecURL || opts.redirectURL,
        permissions: format.permissions(params.permissions || PERMISSIONS),
        account: format.account(params.account)
    }

    return requestP({
        ...opts,
        url: `${opts.base.webservice}/${config.authorization.request}?appId=${query.appId}&appKey=${query.appKey}`,
        method: 'POST',
        body: opts.jsonToXml({ authorizationRequest: body })
    }).then(data => {
        const { code } = data.content.authorizationRequest
        return {
            ...data,
            content: {
                code,
                link: `${opts.base.base}/${config.authorization.response}?code=${code}`
            }
        }
    }).catch(e => e.response)
}


module.exports = {
    request
}
