const xml2js = require("fast-xml-parser");
const logger = require("./logger");
const getBaseUrl = require("./utils").getBaseUrl;
const validate = require("./validate");
const resources = require("./resources");

module.exports = params => {
	/**
	 * Validate params
	 */
	if (!validate.connect(params)) {
		throw new TypeError(
			"Erro ao conectar com pagseguro! Verifique as configurações: [LINK REPOSITÓRIO]"
		);
	}

	/**
	 * Log
	 */
	let log = {
		log: () => {},
		info: () => {},
		error: () => {},
		success: () => {}
	};

	if (params.debug) {
		log = logger(params.log, params.debug);
	}

	/**
	 * Config
	 */
	const config = {
		logger: log,
		env: params.env,
		appId: params.appId,
		appKey: params.appKey,
		notificationURL: params.notificationURL,
		redirectURL: params.redirectURL,
		qs: {
			email: params.email,
			token: params.token
		},
		base: {
			base: getBaseUrl(params.env, "base"),
			static: getBaseUrl(params.env, "static"),
			webservice: getBaseUrl(params.env, "webservice")
		},
		headers: {
			"Content-Type": "application/xml"
			// Accept: "application/vnd.pagseguro.com.br.v3+xml"
		},
		transform: (body, response, resolveWithFullResponse) => {
			// console.log(response)

			let status = response.statusCode <= 200 ? "success" : "error";

			if (xml2js.validate(body) === true) {
				let content = xml2js.parse(body, { trim: true });

				if (response.statusCode <= 200) {
					log.info({
						statusCode: response.statusCode,
						statusMessage: response.statusMessage,
						status,
						content
					});
				} else {
					content = content.errors.error;
					log.error({
						statusCode: response.statusCode,
						statusMessage: response.statusMessage,
						status,
						content
					});
				}

				return {
					statusCode: response.statusCode,
					status,
					content
				};
			}

			const error = {
				statusCode: response.statusCode,
				status,
				content: body
			};

			if (!Array.isArray(error.content)) {
				error.content = [
					{
						code: error.statusCode,
						message: error.content
					}
				];
			}

			log.error({
				...error,
				statusCode: response.statusCode,
				statusMessage: response.statusMessage
			});

			return error;
		},
		jsonToXml: (json, options = { format: true }) => {
			const parser = new xml2js.j2xParser(options);
			return parser.parse(json);
		},
		xmlToJson: (xml, options = { trim: true }) => {
			return xml2js.parse(body, options);
		}
	};

	/**
	 * Resources
	 */
	const rs = {};
	Object.keys(resources).forEach(i => {
		rs[i] = { ...resources[i] };
		Object.keys(rs[i]).forEach(r => {
			if (validate.isFunction(rs[i][r])) {
				rs[i][r] = rs[i][r].bind(null, config);
			}
		});
	});

	return rs;
};
