const request = require("request-promise");
const config = require("../config");
const PagseguroError = require("../Error");

const get = async opts => {
  try {
    const response = await request({
      ...opts,
      url: `${opts.base.webservice}/${config.session}`,
      method: "POST"
    });

    return {
      ...response,
      content: response.content.session.id
    };
  } catch (e) {
    const error = { ...e.response };

    if (error.content && error.content == "Unauthorized") {
      error.content = [
        {
          code: 401,
          message: "Unauthorized"
        }
      ];
    }

    throw new PagseguroError(error);
  }
};

module.exports = {
  get
};
