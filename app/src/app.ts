import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { OrderController } from './infrastructure/controllers/OrderController';
import { errorHandler } from './infrastructure/middlewares/errorHandler';
import { validationMiddleware } from './infrastructure/middlewares/validation';
import { OrderDTO, OrderUpdateDTO } from './types/dto';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const orderController = new OrderController(
  null as any
);

app.post(
  '/orders',
  validationMiddleware(OrderDTO as unknown as ClassConstructor<object>),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData = plainToInstance(OrderDTO, req.body);
      const errors = await validate(orderData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      await orderController.createOrder(req, res);
    } catch (error) {
      next(error);
    }
  }
);

app.get('/orders/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderController.getOrderById(req, res);
  } catch (error) {
    next(error);
  }
});

app.put(
  '/orders/:id',
  validationMiddleware(OrderUpdateDTO as unknown as ClassConstructor<object>),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData = plainToInstance(OrderUpdateDTO, req.body);
      const errors = await validate(orderData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      await orderController.updateOrder(req, res);
    } catch (error) {
      next(error);
    }
  }
);

app.delete('/orders/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderController.deleteOrder(req, res);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;