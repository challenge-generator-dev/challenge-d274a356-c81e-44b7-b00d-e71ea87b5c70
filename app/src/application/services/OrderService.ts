import { Order, OrderDTO, OrderUpdateDTO, OrderProduct } from '../../domain/models/Order';
import { OrderRepository } from '../ports/OrderRepository';

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(dto: OrderDTO): Promise<OrderDTO> {
    const order: Order = {
      id: this.generateOrderId(),
      customerId: dto.customerId,
      products: dto.products.map(p => ({
        productId: p.productId,
        quantity: p.quantity,
        unitPrice: p.unitPrice
      })),
      totalAmount: dto.totalAmount,
      status: dto.status || 'PENDING',
      createdAt: dto.createdAt || new Date()
    };
    
    const created = await this.orderRepository.createOrder(order);
    return this.mapOrderToDto(created);
  }

  async getOrderById(id: string): Promise<OrderDTO | null> {
    if (!id || id.trim().length === 0) {
      throw new Error('El ID de la orden es requerido');
    }
    
    const order = await this.orderRepository.getOrderById(id);
    if (!order) {
      return null;
    }
    
    return this.mapOrderToDto(order);
  }

  async updateOrder(id: string, dto: OrderUpdateDTO): Promise<OrderDTO | null> {
    if (!id || id.trim().length === 0) {
      throw new Error('El ID de la orden es requerido');
    }
    
    const existingOrder = await this.orderRepository.getOrderById(id);
    if (!existingOrder) {
      return null;
    }
    
    const updateData: Partial<Order> = {};
    
    if (dto.status !== undefined) {
      updateData.status = dto.status;
    }
    
    if (dto.products !== undefined) {
      updateData.products = dto.products.map(p => ({
        productId: p.productId,
        quantity: p.quantity,
        unitPrice: p.unitPrice
      }));
    }
    
    const updated = await this.orderRepository.updateOrder(id, updateData);
    if (!updated) {
      return null;
    }
    
    return this.mapOrderToDto(updated);
  }

  async deleteOrder(id: string): Promise<boolean> {
    if (!id || id.trim().length === 0) {
      throw new Error('El ID de la orden es requerido');
    }
    
    const existingOrder = await this.orderRepository.getOrderById(id);
    if (!existingOrder) {
      return false;
    }
    
    return await this.orderRepository.deleteOrder(id);
  }

  private mapOrderToDto(order: Order): OrderDTO {
    return new OrderDTO({
      id: order.id,
      customerId: order.customerId,
      products: order.products.map(p => ({
        productId: p.productId,
        quantity: p.quantity,
        unitPrice: p.unitPrice
      })),
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt
    });
  }

  private generateOrderId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    return `ORD-${timestamp}-${randomPart}`.toUpperCase();
  }
}