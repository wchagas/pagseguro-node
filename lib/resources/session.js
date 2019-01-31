import request from 'request-promise'
import config from '../config'

const get = opts => request({
    ...opts,
    url: `${opts.base.webservice}/${config.session}`,
    method: 'POST'
}).then(data => {
    return {
		...data,
        content: data.content.session.id
    }
}).catch(e => e.response) 


module.exports = {
    get
}

