import { IsString, IsNumber, IsDate, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderProduct {
  @IsString()
  productId!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  unitPrice!: number;

  constructor(data?: Partial<OrderProduct>) {
    if (data) {
      this.productId = data.productId || '';
      this.quantity = data.quantity || 0;
      this.unitPrice = data.unitPrice || 0;
    }
  }
}

export class Order {
  @IsString()
  id!: string;

  @IsString()
  customerId!: string;

  @IsDate()
  @Type(() => Date)
  createdAt!: Date;

  @IsString()
  status!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products!: OrderProduct[];

  @IsNumber()
  totalAmount!: number;

  constructor(data?: Partial<Order>) {
    if (data) {
      this.id = data.id || '';
      this.customerId = data.customerId || '';
      this.createdAt = data.createdAt || new Date();
      this.status = data.status || 'PENDING';
      this.products = data.products || [];
      this.totalAmount = data.totalAmount || 0;
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
  @Type(() => OrderProduct)
  products!: OrderProduct[];

  @IsNumber()
  totalAmount!: number;

  @IsString()
  status!: string;

  @IsDate()
  @Type(() => Date)
  createdAt!: Date;

  constructor(data?: Partial<OrderDTO>) {
    if (data) {
      this.id = data.id || '';
      this.customerId = data.customerId || '';
      this.customerEmail = data.customerEmail || '';
      this.products = data.products || [];
      this.totalAmount = data.totalAmount || 0;
      this.status = data.status || 'PENDING';
      this.createdAt = data.createdAt || new Date();
    }
  }
}

export class OrderUpdateDTO {
  @IsString()
  status?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products?: OrderProduct[];

  @IsNumber()
  totalAmount?: number;

  constructor(data?: Partial<OrderUpdateDTO>) {
    if (data) {
      this.status = data.status;
      this.products = data.products;
      this.totalAmount = data.totalAmount;
    }
  }
}