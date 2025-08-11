const cheerio = require('cheerio');
const { META_SELECTORS } = require('../utils/constants');

class MetadataService {
  extractMetadata(html, url) {
    const $ = cheerio.load(html);
    
    return {
      title: this._extractTitle($),
      description: this._extractDescription($),
      imageUrl: this._extractImageUrl($, url),
      siteName: this._extractSiteName($, url)
    };
  }

  _getMeta($, selectors) {
    for (const selector of selectors) {
      const content = $(selector).attr('content');
      if (content && content.trim()) {
        return content.trim();
      }
    }
    return null;
  }

  _extractTitle($) {
    return this._getMeta($, META_SELECTORS.TITLE) || 
           $('title').text().trim() || 
           null;
  }

  _extractDescription($) {
    return this._getMeta($, META_SELECTORS.DESCRIPTION);
  }

  _extractImageUrl($, url) {
    let imageUrl = this._getMeta($, META_SELECTORS.IMAGE);

    // Make relative URLs absolute
    if (imageUrl && !imageUrl.startsWith('http')) {
      const urlObj = new URL(url);
      if (imageUrl.startsWith('//')) {
        imageUrl = urlObj.protocol + imageUrl;
      } else if (imageUrl.startsWith('/')) {
        imageUrl = urlObj.origin + imageUrl;
      } else {
        imageUrl = urlObj.origin + '/' + imageUrl;
      }
    }

    return imageUrl;
  }

  _extractSiteName($, url) {
    return this._getMeta($, META_SELECTORS.SITE_NAME) || 
           new URL(url).hostname || 
           null;
  }
}

module.exports = new MetadataService();
