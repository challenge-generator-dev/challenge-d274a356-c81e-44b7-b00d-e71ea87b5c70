import { IsString, IsNumber, IsArray, IsOptional, IsEnum, IsDateString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export class OrderProductDTO {
  @IsString()
  productId!: string;

  @IsString()
  name!: string;

  @IsNumber()
  @Min(0.01)
  unitPrice!: number;

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsNumber()
  @Min(0)
  discount!: number;

  constructor(partial?: Partial<OrderProductDTO>) {
    if (partial) {
      Object.assign(this, partial);
      this.discount = this.discount ?? 0;
    }
  }
}

export class OrderDTO {
  @IsString()
  id!: string;

  @IsString()
  customerId!: string;

  @IsString()
  customerEmail!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products!: OrderProductDTO[];

  @IsNumber()
  @Min(0)
  subtotal!: number;

  @IsNumber()
  @Min(0)
  tax!: number;

  @IsNumber()
  @Min(0)
  shippingCost!: number;

  @IsNumber()
  @Min(0)
  totalAmount!: number;

  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @IsDateString()
  createdAt!: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  constructor(partial?: Partial<OrderDTO>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

export class OrderUpdateDTO {
  @IsOptional()
  @IsString()
  customerEmail?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products?: OrderProductDTO[];

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  constructor(partial?: Partial<OrderUpdateDTO>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

export class CreateOrderDTO {
  @IsString()
  customerId!: string;

  @IsString()
  @IsOptional()
  customerEmail?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products!: OrderProductDTO[];

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  constructor(partial?: Partial<CreateOrderDTO>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

export class OrderIdParamDTO {
  @IsString()
  id!: string;

  constructor(partial?: Partial<OrderIdParamDTO>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

export class ErrorResponseDTO {
  @IsString()
  success!: string;

  @IsString()
  message!: string;

  @IsOptional()
  errors?: Array<{
    field: string;
    message: string;
  }>;

  @IsOptional()
  correlationId?: string;

  constructor(partial?: Partial<ErrorResponseDTO>) {
    if (partial) {
      Object.assign(this, partial);
      this.success = this.success || 'false';
    }
  }
}

export class ApiResponseDTO<T> {
  @IsString()
  success!: string;

  data?: T;

  @IsOptional()
  message?: string;

  @IsOptional()
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };

  constructor(partial?: Partial<ApiResponseDTO<T>>) {
    if (partial) {
      Object.assign(this, partial);
      this.success = this.success || 'true';
    }
  }
}