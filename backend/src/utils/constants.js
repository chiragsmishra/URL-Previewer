module.exports = {
  HTTP_STATUS: {
    OK: 200,
    BAD_REQUEST: 400,
    REQUEST_TIMEOUT: 408,
    INTERNAL_SERVER_ERROR: 500
  },
  
  ERROR_MESSAGES: {
    URL_REQUIRED: 'URL is required and must be a string',
    INVALID_URL_FORMAT: 'Invalid URL format. Must be a valid HTTP or HTTPS URL',
    NO_CONTENT_RECEIVED: 'No content received from URL',
    URL_NOT_FOUND: 'URL not found or unreachable',
    CONNECTION_REFUSED: 'Connection refused by server',
    REQUEST_TIMEOUT: 'Request timeout - the website took too long to respond',
    FETCH_FAILED: 'Failed to fetch URL preview'
  },

  DEFAULT_CONFIG: {
    PORT: 3000,
    TIMEOUT: 15000,
    MAX_REDIRECTS: 5,
    USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  },

  META_SELECTORS: {
    TITLE: [
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
      'meta[name="title"]'
    ],
    DESCRIPTION: [
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
      'meta[name="description"]'
    ],
    IMAGE: [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
      'meta[name="twitter:image:src"]'
    ],
    SITE_NAME: [
      'meta[property="og:site_name"]',
      'meta[name="application-name"]',
      'meta[name="apple-mobile-web-app-title"]'
    ]
  }
};
