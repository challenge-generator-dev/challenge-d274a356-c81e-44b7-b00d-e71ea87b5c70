import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export interface ValidationMiddlewareOptions {
  dtoClass: new () => unknown;
  validatorOptions?: ValidatorOptions;
  validateBody?: boolean;
  validatedPropertyName?: string;
}

export const validationMiddleware = (options: ValidationMiddlewareOptions) => {
  const {
    dtoClass,
    validatorOptions = { whitelist: true, forbidNonWhitelisted: true },
    validateBody = true,
    validatedPropertyName = 'validatedData'
  } = options;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataToValidate = validateBody ? req.body : req.params;
      
      const dtoInstance = plainToInstance(dtoClass(), dataToValidate as object, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true
      });

      const validationErrors: ValidationError[] = await validate(
        dtoInstance as object,
        validatorOptions
      );

      if (validationErrors.length > 0) {
        const errors = formatValidationErrors(validationErrors);
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors
        });
        return;
      }

      (req as unknown as Record<string, unknown>)[validatedPropertyName] = dtoInstance;
      next();
    } catch (error) {
      next(error);
    }
  };
};

function formatValidationErrors(validationErrors: ValidationError[]): Array<{
  field: string;
  message: string;
  constraints?: Record<string, string>;
}> {
  return validationErrors.map((error) => ({
    field: error.property,
    message: Object.values(error.constraints || {}).join(', '),
    constraints: error.constraints
  }));
}

export const validateBody = (
  dtoClass: new () => unknown,
  customOptions?: Partial<Omit<ValidationMiddlewareOptions, 'dtoClass' | 'validateBody'>>
) => {
  return validationMiddleware({
    dtoClass,
    validateBody: true,
    ...customOptions
  });
};

export const validateParams = (
  dtoClass: new () => unknown,
  customOptions?: Partial<Omit<ValidationMiddlewareOptions, 'dtoClass' | 'validateBody'>>
) => {
  return validationMiddleware({
    dtoClass,
    validateBody: false,
    ...customOptions
  });
};