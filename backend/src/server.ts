import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import './database/index';
import routes from './routes/index';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        error: {
          message: err.message,
          status: err.statusCode,
        },
      });
    }

    return response.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  },
);

app.listen(3333, () => {
  console.log('Server running on http://localhost:3333');
});
