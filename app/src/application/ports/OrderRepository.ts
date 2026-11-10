import { Order } from '../../domain/models/Order';

export interface OrderRepository {
  createOrder(order: Order): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  updateOrder(id: string, order: Partial<Order>): Promise<Order | null>;
  deleteOrder(id: string): Promise<boolean>;
}