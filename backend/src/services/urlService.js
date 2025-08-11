const httpClient = require('../utils/httpClient');
const { ERROR_MESSAGES } = require('../utils/constants');

class UrlService {
  async fetchUrlContent(url) {
    try {
      const response = await httpClient.fetchWithTimeout(url);
      
      if (!response.data) {
        throw new Error(ERROR_MESSAGES.NO_CONTENT_RECEIVED);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UrlService();
