class RequestError extends Error {
  constructor(msg, type, statusCode) {
    super(msg);
    this.type = type;
    this.statusCode = statusCode;
  }
}

const createRequestError = (msg, type, code) => new RequestError(msg, type, code);

module.exports = { RequestError, createRequestError };
