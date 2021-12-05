const { createCustomError, CustomAPIError } = require('../utils/customError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = errorHandler;
