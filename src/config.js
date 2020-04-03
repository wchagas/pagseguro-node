module.exports = {
  base: {
    production: "https://pagseguro.uol.com.br",
    sandbox: "https://sandbox.pagseguro.uol.com.br"
  },
  static: {
    production: "https://stc.pagseguro.uol.com.br",
    sandbox: "https://stc.sandbox.pagseguro.uol.com.br"
  },
  webservice: {
    production: "https://ws.pagseguro.uol.com.br",
    sandbox: "https://ws.sandbox.pagseguro.uol.com.br"
  },
  session: "v2/sessions",
  transaction: {
    search: "v3/transactions",
    //abandoned: 'v2/transactions' TODO: use?
    directPayment: "v2/transactions",
    code: "v2/transactions",
    refund: "v2/transactions/refunds",
    cancel: "v2/transactions/cancels",
    notification: "v3/transactions/notifications"
  },
  split: {
    transaction: "transactions"
  },

  // -- working! --
  authorization: {
    request: "v2/authorizations/request",
    response: "v2/authorization/request.jhtml",
    search: "v2/authorizations",
    notification: "v2/authorizations/notifications"
  },
  notification: {
    preApproval: "v2/pre-approvals/notifications"
  },
  payment: {
    request: "v2/checkout",
    response: "v2/checkout/payment.html"
  },
  installment: "v2/installments",
  preApproval: {
    request: "v2/pre-approvals/request",
    response: "v2/pre-approvals/request.html",
    cancel: "v2/pre-approvals/cancel",
    charge: "v2/pre-approvals/payment",
    search: "v2/pre-approvals"
  },
  directPreApproval: {
    request: "pre-approvals",
    accession: "pre-approvals",
    plan: "pre-approvals/request",
    query: "pre-approvals",
    payment: "pre-approvals/payment",
    status: "pre-approvals",
    cancel: "pre-approvals",
    discount: "pre-approvals",
    changePayment: "pre-approvals",
    queryPaymentORder: "pre-approvals",
    queryNotification: "pre-approvals",
    retryPaymentOrder: "pre-approvals"
  }
};
