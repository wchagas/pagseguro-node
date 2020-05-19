const request = require('request-promise')
const clone = require("clone");
const config = require('../config')
const PagseguroError = require('../Error')

/**
 * getExtraParams
 * @param {Object} opts
 * @param {Object} params
 * @return {Object}
 */
const getExtraParams = (opts, params) => {
  opts = clone(opts);

  opts.headers = {
    ...opts.headers,
    Accept: "application/vnd.pagseguro.com.br.v3+xml"
  };

  return {
    opts
  };
};

const get = async (opts, params) => {

  let url = `${opts.base.cards}/${config.token}`;

  const headers = getExtraParams(opts, params);
  opts = headers.opts;
  opts.qs = {
    ...opts.qs,
    ...params
  }

  try {
    const response = await request({
      ...opts,
      url,
      method: "POST"
    });

    return {
      ...response,
      content: response.content ? response.content.card : ''
    };
  } catch ({ response }) {
    throw new PagseguroError(response);
  }
};

module.exports = {
  get
}
