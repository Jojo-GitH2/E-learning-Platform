const http = require('http');
const app = require('./app');
const setupSocket = require('./config/socket');
const logger = require('./config/logger');

const PORT = process.env.PORT || 1080;
const server = http.createServer(app);

// Setup Socket.io
setupSocket(server);

server.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
