const axios = require('axios');
const { DEFAULT_CONFIG } = require('./constants');

class HttpClient {
  constructor() {
    this.userAgent = process.env.USER_AGENT || DEFAULT_CONFIG.USER_AGENT;
    this.timeout = process.env.REQUEST_TIMEOUT || DEFAULT_CONFIG.TIMEOUT;
  }

  async fetchWithTimeout(url, timeout = this.timeout) {
    const source = axios.CancelToken.source();
    
    const timeoutId = setTimeout(() => {
      source.cancel('Request timeout');
    }, timeout);

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'DNT': '1',
          'Connection': 'keep-alive',
        },
        timeout: timeout,
        cancelToken: source.token,
        maxRedirects: DEFAULT_CONFIG.MAX_REDIRECTS,
        validateStatus: (status) => status < 400
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}

module.exports = new HttpClient();
