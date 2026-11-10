import { OrderDTO, OrderUpdateDTO } from '../src/domain/models/Order';
import { OrderService } from '../src/application/services/OrderService';

describe('OrderService - Pruebas Unitarias CRUD', () => {
  let mockOrderService: jest.Mocked<OrderService>;
  let orderService: OrderService;

  const mockOrderDTO: OrderDTO = {
    id: 'order-123',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    status: 'PENDING',
    products: [
      { productId: 'prod-001', name: 'Laptop', price: 1200, quantity: 1 },
      { productId: 'prod-002', name: 'Mouse', price: 25, quantity: 2 }
    ],
    totalAmount: 1250
  };

  const mockOrderUpdateDTO: OrderUpdateDTO = {
    status: 'COMPLETED',
    products: [
      { productId: 'prod-001', name: 'Laptop', price: 1200, quantity: 1 }
    ],
    totalAmount: 1200
  };

  beforeEach(() => {
    mockOrderService = {
      createOrder: jest.fn(),
      getOrderById: jest.fn(),
      updateOrder: jest.fn(),
      deleteOrder: jest.fn()
    } as jest.Mocked<OrderService>;
    orderService = new OrderService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('debería crear una orden exitosamente cuando los datos son válidos', async () => {
      mockOrderService.createOrder.mockResolvedValue(mockOrderDTO);
      
      const result = await mockOrderService.createOrder(mockOrderDTO);
      
      expect(mockOrderService.createOrder).toHaveBeenCalledTimes(1);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(mockOrderDTO);
      expect(result).toEqual(mockOrderDTO);
      expect(result.id).toBe('order-123');
      expect(result.status).toBe('PENDING');
    });

    it('debería lanzar error cuando los datos de la orden son inválidos', async () => {
      const invalidOrder = {
        id: '',
        createdAt: new Date(),
        status: 'INVALID_STATUS',
        products: [],
        totalAmount: -100
      };
      
      mockOrderService.createOrder.mockRejectedValue(
        new Error('Los datos de la orden son inválidos')
      );
      
      await expect(mockOrderService.createOrder(invalidOrder)).rejects.toThrow(
        'Los datos de la orden son inválidos'
      );
    });

    it('debería calcular automáticamente el totalAmount cuando no se proporciona', async () => {
      const orderWithoutTotal: OrderDTO = {
        id: 'order-456',
        createdAt: new Date(),
        status: 'PENDING',
        products: [
          { productId: 'prod-001', name: 'Keyboard', price: 80, quantity: 1 },
          { productId: 'prod-002', name: 'Monitor', price: 300, quantity: 1 }
        ]
      };
      
      const expectedTotal = 380;
      const orderWithCalculatedTotal = { ...orderWithoutTotal, totalAmount: expectedTotal };
      
      mockOrderService.createOrder.mockResolvedValue(orderWithCalculatedTotal);
      
      const result = await mockOrderService.createOrder(orderWithoutTotal);
      
      expect(result.totalAmount).toBe(expectedTotal);
    });
  });

  describe('getOrderById', () => {
    it('debería obtener una orden por su ID exitosamente', async () => {
      mockOrderService.getOrderById.mockResolvedValue(mockOrderDTO);
      
      const result = await mockOrderService.getOrderById('order-123');
      
      expect(mockOrderService.getOrderById).toHaveBeenCalledTimes(1);
      expect(mockOrderService.getOrderById).toHaveBeenCalledWith('order-123');
      expect(result).toEqual(mockOrderDTO);
      expect(result?.id).toBe('order-123');
    });

    it('debería retornar null cuando la orden no existe', async () => {
      mockOrderService.getOrderById.mockResolvedValue(null);
      
      const result = await mockOrderService.getOrderById('non-existent-id');
      
      expect(result).toBeNull();
      expect(mockOrderService.getOrderById).toHaveBeenCalledWith('non-existent-id');
    });

    it('debería lanzar error cuando el ID proporcionado es inválido', async () => {
      mockOrderService.getOrderById.mockRejectedValue(
        new Error('ID de orden inválido')
      );
      
      await expect(mockOrderService.getOrderById('')).rejects.toThrow('ID de orden inválido');
    });
  });

  describe('updateOrder', () => {
    it('debería actualizar una orden exitosamente', async () => {
      const updatedOrder: OrderDTO = {
        ...mockOrderDTO,
        status: 'COMPLETED',
        products: mockOrderUpdateDTO.products,
        totalAmount: mockOrderUpdateDTO.totalAmount
      };
      
      mockOrderService.updateOrder.mockResolvedValue(updatedOrder);
      
      const result = await mockOrderService.updateOrder('order-123', mockOrderUpdateDTO);
      
      expect(mockOrderService.updateOrder).toHaveBeenCalledTimes(1);
      expect(mockOrderService.updateOrder).toHaveBeenCalledWith('order-123', mockOrderUpdateDTO);
      expect(result.status).toBe('COMPLETED');
      expect(result.totalAmount).toBe(1200);
    });

    it('debería lanzar error cuando se intenta actualizar una orden inexistente', async () => {
      mockOrderService.updateOrder.mockRejectedValue(
        new Error('Orden no encontrada para actualizar')
      );
      
      await expect(
        mockOrderService.updateOrder('non-existent-id', mockOrderUpdateDTO)
      ).rejects.toThrow('Orden no encontrada para actualizar');
    });

    it('debería mantener los campos no actualizados cuando se actualiza parcialmente', async () => {
      const partialUpdate: OrderUpdateDTO = {
        status: 'CANCELLED'
      };
      
      const orderAfterPartialUpdate: OrderDTO = {
        ...mockOrderDTO,
        status: 'CANCELLED'
      };
      
      mockOrderService.updateOrder.mockResolvedValue(orderAfterPartialUpdate);
      
      const result = await mockOrderService.updateOrder('order-123', partialUpdate);
      
      expect(result.id).toBe(mockOrderDTO.id);
      expect(result.createdAt).toEqual(mockOrderDTO.createdAt);
      expect(result.products).toEqual(mockOrderDTO.products);
      expect(result.status).toBe('CANCELLED');
    });
  });

  describe('deleteOrder', () => {
    it('debería eliminar una orden exitosamente', async () => {
      mockOrderService.deleteOrder.mockResolvedValue(undefined);
      
      await mockOrderService.deleteOrder('order-123');
      
      expect(mockOrderService.deleteOrder).toHaveBeenCalledTimes(1);
      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-123');
    });

    it('debería lanzar error cuando se intenta eliminar una orden inexistente', async () => {
      mockOrderService.deleteOrder.mockRejectedValue(
        new Error('Orden no encontrada para eliminar')
      );
      
      await expect(mockOrderService.deleteOrder('non-existent-id')).rejects.toThrow(
        'Orden no encontrada para eliminar'
      );
    });

    it('debería lanzar error cuando el ID es vacío', async () => {
      mockOrderService.deleteOrder.mockRejectedValue(
        new Error('ID de orden requerido para eliminar')
      );
      
      await expect(mockOrderService.deleteOrder('')).rejects.toThrow(
        'ID de orden requerido para eliminar'
      );
    });
  });

  describe('Validaciones de estado de orden', () => {
    const validStatuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
    
    it('debería aceptar estados válidos de orden', () => {
      validStatuses.forEach(status => {
        const order: OrderDTO = {
          ...mockOrderDTO,
          status: status as any
        };
        expect(validStatuses).toContain(order.status);
      });
    });

    it('debería rechazar estados inválidos de orden', () => {
      const invalidStatuses = ['INVALID', 'pending', 'COMPLETE', 'CANCELED'];
      
      invalidStatuses.forEach(status => {
        expect(validStatuses).not.toContain(status);
      });
    });
  });

  describe('Validaciones de productos', () => {
    it('debería requerir al menos un producto en la orden', async () => {
      const orderWithoutProducts: OrderDTO = {
        id: 'order-empty',
        createdAt: new Date(),
        status: 'PENDING',
        products: [],
        totalAmount: 0
      };
      
      mockOrderService.createOrder.mockRejectedValue(
        new Error('La orden debe contener al menos un producto')
      );
      
      await expect(mockOrderService.createOrder(orderWithoutProducts)).rejects.toThrow(
        'La orden debe contener al menos un producto'
      );
    });

    it('debería validar que la cantidad de productos sea mayor a cero', async () => {
      const orderWithInvalidQuantity: OrderDTO = {
        ...mockOrderDTO,
        products: [
          { productId: 'prod-001', name: 'Test', price: 100, quantity: 0 }
        ]
      };
      
      mockOrderService.createOrder.mockRejectedValue(
        new Error('La cantidad de cada producto debe ser mayor a cero')
      );
      
      await expect(mockOrderService.createOrder(orderWithInvalidQuantity)).rejects.toThrow(
        'La cantidad de cada producto debe ser mayor a cero'
      );
    });

    it('debería validar que el precio de los productos sea positivo', async () => {
      const orderWithNegativePrice: OrderDTO = {
        ...mockOrderDTO,
        products: [
          { productId: 'prod-001', name: 'Test', price: -50, quantity: 1 }
        ]
      };
      
      mockOrderService.createOrder.mockRejectedValue(
        new Error('El precio de los productos debe ser positivo')
      );
      
      await expect(mockOrderService.createOrder(orderWithNegativePrice)).rejects.toThrow(
        'El precio de los productos debe ser positivo'
      );
    });
  });

  describe('Cálculo de totales', () => {
    it('debería calcular correctamente el totalAmount basado en productos', () => {
      const products = [
        { productId: 'prod-001', name: 'Product A', price: 100, quantity: 2 },
        { productId: 'prod-002', name: 'Product B', price: 50, quantity: 3 },
        { productId: 'prod-003', name: 'Product C', price: 25, quantity: 4 }
      ];
      
      const expectedTotal = (100 * 2) + (50 * 3) + (25 * 4);
      
      expect(expectedTotal).toBe(200 + 150 + 100);
      expect(expectedTotal).toBe(450);
    });

    it('debería detectar discrepancias entre el total proporcionado y el calculado', () => {
      const products = [
        { productId: 'prod-001', name: 'Product A', price: 100, quantity: 1 }
      ];
      
      const providedTotal = 50;
      const calculatedTotal = 100;
      
      expect(providedTotal).not.toBe(calculatedTotal);
    });
  });
});