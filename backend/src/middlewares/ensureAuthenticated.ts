import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import AuthSecret from '../config/authentication';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT - authentication token is missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, AuthSecret.jwt.secret);

    const { sub } = decodedToken as TokenPayLoad;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('JWT - Invalid authentication token!', 401);
  }
}
