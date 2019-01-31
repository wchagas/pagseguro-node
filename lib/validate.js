import { REQUIRED_PARAMS } from './config'


/**
 * isString
 */
export const isString = value => typeof value === 'string' || value instanceof String


/**
 * isNumber
 */
export const isNumber = value => typeof value === 'number' && isFinite(value)


/**
 * isArray
 */
export const isArray = value => Array.isArray(value)


/**
 * isFunction
 */
export const isFunction = value => typeof value === 'function'


/**
 * isObject
 */
export const isObject = value => value && typeof value === 'object' && value.constructor === Object


/**
 * isNull
 */
export const isNull = value => value === null 


/**
 * isUndefined
 */
export const isUndefined = value => value === 'undefined'


/**
 * isBoolean
 */
export const isBoolean = value => typeof value === 'boolean'


/**
 * isRegExp
 */
export const isRegExp = value => value && typeof value === 'object' && value.constructor === RegExp


/**
 * isError
 */
export const isError = value => value instanceof Error && typeof value.message !== 'undefined'


/**
 * isSymbol
 */
export const isSymbol = value => typeof value === 'symbol'


/**
 * isDate
 */
export const isDate = value => value instanceof Date


/**
 * connect
 * @param {Object} params
 * @return {Boolean}
 */
export const connect = params => {

	if (!isObject(params)) {
		return
	}
	
	params = Object.keys(params)

    for (let i in REQUIRED_PARAMS) {
        if (params.indexOf(REQUIRED_PARAMS[i]) === -1) {
            return
        }
    }

    return true
}


