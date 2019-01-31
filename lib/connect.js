import xml2js from 'fast-xml-parser'
import logger from './logger'
import { getBaseUrl } from './config'
import * as validate from './validate'
import * as resources from './resources'

export default params => {


    /**
     * Validate params
     */
    if (!validate.connect(params)) {
        throw new TypeError('Erro ao conectar com pagseguro! Verifique as configurações: [LINK REPOSITÓRIO]')
    }



    /**
     * Log
     */
    let log = logger(params.log, params.debug)
    if (params.logger) {
        log = logger
    }



    /**
     * Config
     */
    const config = {
        env: params.env,
        logger: log,
        senderEmail: params.senderEmail,
        appId: params.appId,
        appKey: params.appKey,
        notificationURL: params.notificationURL,
	    redirectURL: params.redirectURL,
        qs: {
            email: params.email,
            token: params.token
        },
        base: {
            base: getBaseUrl(params.env, 'base'),
            static: getBaseUrl(params.env, 'static'),
            webservice: getBaseUrl(params.env, 'webservice'),
        },
        headers: {
            'Content-Type': 'application/xml'
        },
        transform: (body, response, resolveWithFullResponse) => {

            //console.log(response)

            let status =  response.statusCode <= 200 ? 'success' : 'error'

            if (xml2js.validate(body) === true) {
                let content = null

                if (response.statusCode <= 200) {
                    content = xml2js.parse(body, {trim: true})
                    log.info({
                        statusCode: response.statusCode,
                        statusMessage: response.statusMessage,
                        status,
                        content
                    })
                } else {
                    content = xml2js.parse(body, {trim: true}).errors.error
                    log.error({
                        statusCode: response.statusCode,
                        statusMessage: response.statusMessage,
                        status,
                        content
                    })
                }

                const rs = {
                    statusCode: response.statusCode,
                    status,
                    content
                }

                return rs
            }

            const error = {
                statusCode: response.statusCode,
                status,
                content: body
            }

            log.error({
                ...error,
                statusCode: response.statusCode,
                statusMessage: response.statusMessage,
            })

            return error
        },
        jsonToXml: (json, options = { format: true }) => {
            const parser = new xml2js.j2xParser(options)
            return parser.parse(json)
        },
        xmlToJson: (xml, options = { trim: true }) => {
            return xml2js.parse(body, options)
        }
    }



    /**
     * Resources
     */
    const rs = {}
    Object.keys(resources).forEach(i => {
        rs[i] = { ...resources[i] }
        Object.keys(rs[i]).forEach(r => {
            if (validate.isFunction(rs[i][r])) {
                rs[i][r] = rs[i][r].bind(null, config)
            }
        })
    })

    return rs
}
