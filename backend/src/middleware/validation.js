const validator = require('validator');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

const validateUrl = (req, res, next) => {
  const { url } = req.body;

  // Check if URL exists and is a string
  if (!url || typeof url !== 'string') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: ERROR_MESSAGES.URL_REQUIRED
    });
  }

  // Validate URL format and protocol
  if (!validator.isURL(url, { 
    protocols: ['http', 'https'], 
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true 
  })) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: ERROR_MESSAGES.INVALID_URL_FORMAT
    });
  }

  // Attach cleaned URL to request
  req.validatedUrl = url.trim();
  next();
};

module.exports = {
  validateUrl
};
