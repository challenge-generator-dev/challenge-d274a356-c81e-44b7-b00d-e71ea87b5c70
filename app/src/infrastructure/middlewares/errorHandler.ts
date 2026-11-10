import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso no encontrado') {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Error de validación') {
    super(message, 400);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflicto de datos') {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Error interno del servidor') {
    super(message, 500);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error capturado por middleware de errores:');
  console.error('Mensaje:', err.message);
  console.error('Stack:', err.stack);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Error de validación de datos',
      error: err.message,
      statusCode: 400
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({
      message: 'ID de recurso inválido',
      statusCode: 400
    });
    return;
  }

  const internalError = new InternalServerError('Error interno del servidor');
  res.status(internalError.statusCode).json({
    message: internalError.message,
    statusCode: internalError.statusCode,
    ...(process.env.NODE_ENV !== 'production' && { 
      originalError: err.message,
      stack: err.stack 
    })
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  console.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    message: `Ruta ${req.originalUrl} no encontrada`,
    statusCode: 404,
    method: req.method,
    path: req.originalUrl
  });
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};