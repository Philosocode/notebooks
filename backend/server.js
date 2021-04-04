const logger = require("./utils/logger.util");

// e.g. console.log(undefined VAR)
process.on('uncaughtException', err => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.stack);
  
  process.exit(1);
});

const app = require("./app");

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`️Server is running at http://localhost:${PORT}`);
});

// deal with unhandled promise rejections
process.on('unhandledRejection', err => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
