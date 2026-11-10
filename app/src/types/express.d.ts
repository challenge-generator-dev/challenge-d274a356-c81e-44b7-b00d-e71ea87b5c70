import 'express';

/**
 * Extensiones de tipos para Express Request.
 * 
 * Este archivo declara propiedades adicionales que se agregarán
 * al objeto Request de Express, permitiendo un acceso tipado
 * a datos validados y otros valores injectados por middlewares.
 */

declare global {
  namespace Express {
    /**
     * Extensión de la interfaz Request de Express.
     * Agrega propiedades custom para datos validados y otros
     * valores injectados por middlewares de la aplicación.
     */
    interface Request {
      /**
       * Datos validados por el middleware de validación.
       * Contiene el DTO transformado y validado.
       * Se asigna mediante el middleware de validación.
       */
      validatedData?: Record<string, unknown>;

      /**
       * Usuario autenticado extraído del middleware de autenticación.
       * Contiene la información del usuario que realizó la petición.
       * Undefined si no hay autenticación o es anónima.
       */
      user?: {
        id: string;
        email: string;
        role: string;
      };

      /**
       * Correlation ID para trazabilidad de peticiones.
       * Generado por el middleware de logging o por el cliente.
       * Se propaga a través de todos los servicios y logs.
       */
      correlationId?: string;

      /**
       * Timestamp de cuando inició la petición.
       * Utilizado para calcular la duración total de la respuesta.
       */
      requestStartTime?: number;

      /**
       * Metadata adicional de la petición.
       * Puede incluir información como IP del cliente,
       * User-Agent, información de geolocalización, etc.
       */
      requestMetadata?: {
        ip: string;
        userAgent: string;
        method: string;
        path: string;
        query: Record<string, string>;
      };
    }

    /**
     * Extensión de la interfaz Response de Express.
     * Agrega métodos helper para respuestas estandarizadas.
     */
    interface Response {
      /**
       * Envía una respuesta exitosa con formato estándar.
       * 
       * @param data - Datos a incluir en la respuesta
       * @param statusCode - Código de estado HTTP (por defecto 200)
       */
      success<T>(data: T, statusCode?: number): this;

      /**
       * Envía una respuesta de error con formato estándar.
       * 
       * @param message - Mensaje descriptivo del error
       * @param statusCode - Código de estado HTTP (por defecto 500)
       * @param errors - Detalles adicionales del error
       */
      error(message: string, statusCode?: number, errors?: unknown[]): this;
    }

    /**
     * Extensión de la interfaz Application de Express.
     * Declara propiedades específicas de la aplicación.
     */
    interface Application {
      /**
       * Indica si la aplicación está en modo de pruebas.
       * Configurado mediante la variable de entorno NODE_ENV.
       */
      isTest?: boolean;
    }
  }
}

/**
 * Tipo para el handler de errores de Express.
 * Extiende el tipo nativo para incluir el correlationId.
 */
export interface ErrorRequestHandler {
  (
    err: Error & { statusCode?: number; correlationId?: string },
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): void;
}

/**
 * Tipo para funciones middleware de Express con soporte
 * para datos validados.
 */
export type ValidatedRequestHandler = (
  req: Express.Request & { validatedData: Record<string, unknown> },
  res: Express.Response,
  next: Express.NextFunction
) => void;

/**
 * Tipo para el middleware de Express que inyecta el usuario.
 */
export type AuthenticatedRequestHandler = (
  req: Express.Request & { user: Express.Request['user'] },
  res: Express.Response,
  next: Express.NextFunction
) => void;