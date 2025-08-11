require('dotenv').config();
const createApp = require('./src/app');
const { DEFAULT_CONFIG } = require('./src/utils/constants');

const PORT = process.env.PORT || DEFAULT_CONFIG.PORT;

const app = createApp();

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
