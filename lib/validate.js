"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof"));/**
 * isString
 */function isString(a){return"string"==typeof a||a instanceof String}/**
 * isNumber
 */function isNumber(a){return"number"==typeof a&&isFinite(a)}/**
 * isArray
 */function isArray(a){return Array.isArray(a)}/**
 * isFunction
 */function isFunction(a){return"function"==typeof a}/**
 * isObject
 */function isObject(a){var b=(0,_typeof2.default)(a);return"function"===b||"object"===b&&!!a}/**
 * isNull
 */function isNull(a){return null===a}/**
 * isUndefined
 */function isUndefined(a){return"undefined"===a}/**
 * isBoolean
 */function isBoolean(a){return"boolean"==typeof a}/**
 * isRegExp
 */function isRegExp(a){return a&&"object"===(0,_typeof2.default)(a)&&a.constructor===RegExp}/**
 * isError
 */function isError(a){return a instanceof Error&&"undefined"!=typeof a.message}/**
 * isSymbol
 */function isSymbol(a){return"symbol"===(0,_typeof2.default)(a)}/**
 * isDate
 */function isDate(a){return a instanceof Date}/**
 * isEquivalent
 */function isEquivalent(c,a){var b=Object.getOwnPropertyNames(c),d=Object.getOwnPropertyNames(a);if(b.length!=d.length)return!1;for(var e,f=0;f<b.length;f++)if(e=b[f],c[e]!==a[e])return!1;return!0}/**
 * isEmail
 */function isEmail(a){var b=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return b.test((a+"").toLowerCase())}/**
 * connect
 * @param {Object} params
 * @return {Boolean}
 */function connect(a){if(isObject(a)){var b=["email","token","env","log"];for(var c in a=Object.keys(a),b)if(-1===a.indexOf(b[c]))return;return!0}}/**
 * exports
 */module.exports={isString:isString,isNumber:isNumber,isArray:isArray,isFunction:isFunction,isObject:isObject,isNull:isNull,isUndefined:isUndefined,isBoolean:isBoolean,isRegExp:isRegExp,isError:isError,isSymbol:isSymbol,isDate:isDate,isEmail:isEmail,isEquivalent:isEquivalent,connect:connect};