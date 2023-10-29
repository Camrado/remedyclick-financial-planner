const { BadRequestError } = require('../errors');

const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ msg: err.message, type: err.type });
  }

  return res.status(500).json({ msg: 'Something went wrong, please try again', err });
};

module.exports = errorHandlerMiddleware;
