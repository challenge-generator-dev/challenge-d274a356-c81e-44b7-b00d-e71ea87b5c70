import { Request, Response, Router } from 'express';
import { OrderDTO, OrderUpdateDTO } from '../../domain/models/Order';
import { OrderService } from '../../application/services/OrderService';
import { validationMiddleware } from '../middlewares/validation';

const router = Router();

export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
    this.registerRoutes();
  }

  private registerRoutes(): void {
    router.post('/', validationMiddleware({ dtoClass: OrderDTO as new () => unknown }), this.createOrder.bind(this));
    router.get('/:id', this.getOrderById.bind(this));
    router.put('/:id', validationMiddleware({ dtoClass: OrderUpdateDTO as new () => unknown }), this.updateOrder.bind(this));
    router.delete('/:id', this.deleteOrder.bind(this));
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderDTO = req.body as OrderDTO;
      const createdOrder = await this.orderService.createOrder(orderDTO);
      res.status(201).json(createdOrder);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const order = await this.orderService.getOrderById(id);
      if (!order) {
        res.status(404).json({ message: 'Orden no encontrada', id });
        return;
      }
      res.status(200).json(order);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const orderUpdateDTO = req.body as OrderUpdateDTO;
      const updatedOrder = await this.orderService.updateOrder(id, orderUpdateDTO);
      if (!updatedOrder) {
        res.status(404).json({ message: 'Orden no encontrada para actualizar', id });
        return;
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const deleted = await this.orderService.deleteOrder(id);
      if (!deleted) {
        res.status(404).json({ message: 'Orden no encontrada para eliminar', id });
        return;
      }
      res.status(204).send();
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown): void {
    console.error('Error en OrderController:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor desconocido' });
    }
  }

  getRouter(): Router {
    return router;
  }
}