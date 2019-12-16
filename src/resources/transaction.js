const request = require("request-promise");
const clone = require("clone");
const config = require("../config");
const PagseguroError = require("../Error");
const format = require("../format");

/**
 * formatRequestParams
 * @param {Object} opts
 * @param {Object} params
 * @return {Object}
 */
const formatRequestParams = (opts, { ...params }) => {
  params.currency = "BRL";
  params.shipping = format.shipping(params.shipping);
  params.sender = format.sender(params.sender);
  params.extraAmount = format.extraAmount(params.extraAmount);
  params.creditCard = format.creditCard(params.creditCard, params);
  params.billing = format.billing(params.billing);
  params.items = format.items(params.items);

  if (params.hasOwnProperty("receivers")) {
    params.receivers = format.receivers(params.receivers);
    delete params.receiver;
  }

  return params;
};

/**
 * formatRequestParams
 * @param {Object} opts
 * @return {Object}
 */
const getSplitParams = opts => {
  opts = clone(opts);

  opts.qs = {
    appId: opts.appId,
    appKey: opts.appKey
  };

  opts.headers = {
    ...opts.headers,
    Accept: "application/vnd.pagseguro.com.br.v3+xml"
  };

  return {
    opts,
    url: `${opts.base.webservice}/${config.split.transaction}`
  };
};

/**
 * formatResponse
 * @param {Object} response
 * @param {String} method
 */
const formatResponse = (rs = {}, method) => {
  rs.method = method;
  return rs;
};

/**
 * boleto
 * @param {Object} opts
 * @param {Object} params
 * @ return {Promise}
 */
const boleto = async (opts, params) => {
  params.method = "boleto";
  params = formatRequestParams(opts, params);

  let url = `${opts.base.webservice}/${config.transaction.directPayment}`;

  // is split
  if (params.hasOwnProperty("receivers")) {
    const split = getSplitParams(opts);
    url = split.url;
    opts = split.opts;
  }

  // console.log(params.receivers.receiver.split);

  try {
    const response = await request({
      ...opts,
      url,
      method: "POST",
      body: opts.jsonToXml({ payment: params })
    });

    return {
      ...response,
      content: formatResponse(response.content.transaction, "boleto")
    };
  } catch ({ response }) {
    // console.error(response);
    throw new PagseguroError(response);
  }
};

/**
 * creditCard
 * @param {Object} opts
 * @param {Object} params
 * @ return {Promise}
 */
const creditCard = async (opts, params) => {
  params.method = "creditCard";
  params = formatRequestParams(opts, params);

  let url = `${opts.base.webservice}/${config.transaction.directPayment}`;

  // is split
  if (params.hasOwnProperty("receivers")) {
    const split = getSplitParams(opts);
    url = split.url;
    opts = split.opts;
  }

  try {
    const response = await request({
      ...opts,
      url,
      method: "POST",
      body: opts.jsonToXml({ payment: params })
    });

    return {
      ...response,
      content: formatResponse(response.content.transaction, "creditCard")
    };
  } catch ({ response }) {
    throw new PagseguroError(response);
  }
};

/**
 * onlineDebit
 * @param {Object} opts
 * @param {Object} params
 * @ return {Promise}
 */
const onlineDebit = async (opts, params) => {
  params.method = "EFT";
  params = formatRequestParams(opts, params);

  let url = `${opts.base.webservice}/${config.transaction.directPayment}`;

  // is split
  if (params.hasOwnProperty("receivers")) {
    const split = getSplitParams(opts);
    url = split.url;
    opts = split.opts;
  }

  try {
    const response = await request({
      ...opts,
      url,
      method: "POST",
      body: opts.jsonToXml({ payment: params })
    });

    return {
      ...response,
      content: formatResponse(response.content.transaction, "onlineDebit")
    };
  } catch ({ response }) {
    throw new PagseguroError(response);
  }
};

/**
 * cancel
 * @param {Object} opts
 * @param {String} transactionCode
 * @ return {Promise}
 */
const cancel = async (opts, transactionCode) => {
  opts.qs = {
    ...opts.qs,
    transactionCode
  };

  try {
    const response = await request({
      ...opts,
      url: `${opts.base.webservice}/${config.transaction.cancel}`,
      method: "POST"
    });

    return {
      ...response,
      content: `Transação ${transactionCode} cancelada com sucesso.`
    };
  } catch ({ response }) {
    throw new PagseguroError(response);
  }
};

/**
 * refund
 * @param {Object} opts
 * @param {String} transactionCode
 * @param {Number} refundValue
 * @ return {Promise}
 */
const refund = async (opts, transactionCode, refundValue = null) => {
  opts.qs = {
    ...opts.qs,
    transactionCode
  };

  if (refundValue) {
    opts.qs.refundValue = refundValue;
  }

  try {
    const response = await request({
      ...opts,
      url: `${opts.base.webservice}/${config.transaction.refund}`,
      method: "POST"
    });

    return {
      ...response,
      content: `Pedido de reembolso da transação  ${transactionCode} realizado com sucesso.`
    };
  } catch ({ response }) {
    throw new PagseguroError(response);
  }
};

/**
 * search
 * @param {Object} opts
 * @param {Object} query
 * @ return {Promise}
 */
const search = async (opts, query = {}) => {
  opts.qs = {
    ...opts.qs,
    ...query
  };

  const responseContent = data => {
    if (!data) {
      return {
        date: new Date(
          new Date().toString().split("GMT")[0] + " UTC"
        ).toISOString(),
        transactions: [],
        resultsInThisPage: 0,
        currentPage: 1,
        totalPages: 0
      };
    }

    return {
      ...data,
      transactions:
        data.transactions && data.transactions.transaction
          ? data.transactions.transaction
          : []
    };
  };

  try {
    const response = await request({
      ...opts,
      url: `${opts.base.webservice}/${config.transaction.search}`,
      method: "GET"
    });

    return {
      ...response,
      content: responseContent(response.content.transactionSearchResult)
    };
  } catch ({ response }) {
    throw new PagseguroError(response);
  }
};

/**
 * get
 * @param {Object} opts
 * @param {String} transactionCode
 * @ return {Promise}
 */
const get = async (opts, transactionCode) => {
  try {
    const response = await request({
      ...opts,
      url: `${opts.base.webservice}/${config.transaction.code}/${transactionCode}`,
      method: "GET"
    });

    return {
      ...response,
      content: response.content.transaction || null
    };
  } catch ({ response }) {
    throw new PagseguroError(response);
  }
};

/**
 * notification
 * @param {Object} opts
 * @ return {Promise}
 */
const notification = async (opts, notificationCode) => {
  try {
    const response = await request({
      ...opts,
      url: `${opts.base.webservice}/${config.transaction.notification}/${notificationCode}`,
      method: "GET"
    });

    return {
      ...response,
      content: response.content
    };
  } catch ({ response }) {
    throw new PagseguroError(response);
  }
};

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
};
