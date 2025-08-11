const urlService = require('../services/urlService');
const metadataService = require('../services/metadataService');
const { handlePreviewError } = require('../middleware/errorHandler');
const { HTTP_STATUS } = require('../utils/constants');

class PreviewController {
  async getPreview(req, res) {
    try {
      const url = req.validatedUrl;

      // Fetch HTML content
      const htmlContent = await urlService.fetchUrlContent(url);

      // Extract metadata
      const metadata = metadataService.extractMetadata(htmlContent, url);

      // Return metadata
      res.status(HTTP_STATUS.OK).json({
        title: metadata.title,
        description: metadata.description,
        imageUrl: metadata.imageUrl,
        siteName: metadata.siteName
      });

    } catch (error) {
      const { status, message } = handlePreviewError(error);
      res.status(status).json({ error: message });
    }
  }
}

module.exports = new PreviewController();
