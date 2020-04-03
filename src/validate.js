/**
 * isString
 */
function isString(value) {
	return typeof value === "string" || value instanceof String;
}

/**
 * isNumber
 */
function isNumber(value) {
	return typeof value === "number" && isFinite(value);
}

/**
 * isArray
 */
function isArray(value) {
	return Array.isArray(value);
}

/**
 * isFunction
 */
function isFunction(value) {
	return typeof value === "function";
}

/**
 * isObject
 */
function isObject(value) {
	const type = typeof value;
	return type === "function" || (type === "object" && !!value);
}

/**
 * isNull
 */
function isNull(value) {
	return value === null;
}

/**
 * isUndefined
 */
function isUndefined(value) {
	return value === "undefined";
}

/**
 * isBoolean
 */
function isBoolean(value) {
	return typeof value === "boolean";
}

/**
 * isRegExp
 */
function isRegExp(value) {
	return value && typeof value === "object" && value.constructor === RegExp;
}

/**
 * isError
 */
function isError(value) {
	return value instanceof Error && typeof value.message !== "undefined";
}

/**
 * isSymbol
 */
function isSymbol(value) {
	return typeof value === "symbol";
}

/**
 * isDate
 */
function isDate(value) {
	return value instanceof Date;
}

/**
 * isEquivalent
 */
function isEquivalent(a, b) {
	var aProps = Object.getOwnPropertyNames(a);
	var bProps = Object.getOwnPropertyNames(b);

	if (aProps.length != bProps.length) {
		return false;
	}

	for (var i = 0; i < aProps.length; i++) {
		var propName = aProps[i];
		if (a[propName] !== b[propName]) {
			return false;
		}
	}

	return true;
}

/**
 * isEmail
 */
function isEmail(value) {
	const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return pattern.test(String(value).toLowerCase());
}

/**
 * connect
 * @param {Object} params
 * @return {Boolean}
 */
function connect(params) {
	if (!isObject(params)) {
		return;
	}

	const REQUIRED_PARAMS = ["email", "token", "env", "log"];

	params = Object.keys(params);

	for (let i in REQUIRED_PARAMS) {
		if (params.indexOf(REQUIRED_PARAMS[i]) === -1) {
			return;
		}
	}

	return true;
}

/**
 * exports
 */
module.exports = {
	isString,
	isNumber,
	isArray,
	isFunction,
	isObject,
	isNull,
	isUndefined,
	isBoolean,
	isRegExp,
	isError,
	isSymbol,
	isDate,
	isEmail,
	isEquivalent,
	connect
};
