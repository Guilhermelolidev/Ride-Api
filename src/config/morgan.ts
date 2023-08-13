import logger from './logger';
import morgan from 'morgan';
import { Response } from 'express';

morgan.token('message', (req, res: Response) => res.locals.errorMessage || '');

const successResponseFormat = `:method :url :status - :response-time ms`;
const errorResponseFormat = `:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.http(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export default {
  successHandler,
  errorHandler,
};
