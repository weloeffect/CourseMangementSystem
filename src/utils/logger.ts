// import { createLogger, format, transports } from 'winston';

// const logger = createLogger({
//   level: 'info',
//   format: format.combine(
//     format.timestamp(),
//     format.json()
//   ),
//   transports: [
//     new transports.Console(),
//     new transports.File({ filename: 'logs/errors.log', level: 'error' }),
//     new transports.File({ filename: 'logs/combined.log' })
//   ],
// });

import winston from 'winston';

const transports = [
  new winston.transports.Console({
    silent: process.env.NODE_ENV === 'test', // Disable logs in test mode
  }),
];

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports,
});

export default logger;
