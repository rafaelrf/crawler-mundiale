const winston = require('winston');

const logger = winston.createLogger({
  level: 'warn',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'warn' }),
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};
module.exports = logger;
