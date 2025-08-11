const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

const handlePreviewError = (error) => {
  console.error('Preview error:', error.message);

  // Handle different types of errors
  if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
    return {
      status: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.URL_NOT_FOUND
    };
  }

  if (error.code === 'ECONNREFUSED') {
    return {
      status: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.CONNECTION_REFUSED
    };
  }

  if (error.message === 'Request timeout' || error.code === 'ECONNABORTED') {
    return {
      status: HTTP_STATUS.REQUEST_TIMEOUT,
      message: ERROR_MESSAGES.REQUEST_TIMEOUT
    };
  }

  if (error.response && error.response.status >= 400) {
    return {
      status: HTTP_STATUS.BAD_REQUEST,
      message: `Website returned error: ${error.response.status} ${error.response.statusText}`
    };
  }

  // Generic error
  return {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: ERROR_MESSAGES.FETCH_FAILED
  };
};

const errorHandler = (err, req, res, next) => {
  const { status, message } = handlePreviewError(err);
  res.status(status).json({ error: message });
};

module.exports = {
  handlePreviewError,
  errorHandler
};
