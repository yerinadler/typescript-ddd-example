import { inject, injectable } from 'inversify';
import { NotFoundError } from '@src/core/errors';
import { DI_TOKENS } from '@src/di-tokens';
import { Order } from '@src/domain/order/order';
import { OrderItem } from '@src/domain/order/order-item';
import { IOrderRepository } from '@src/domain/order/order-repository.interface';
import { AddOrderItemDTO, CreateOrderDTO, OrderDTO, OrderItemDTO } from './order.dtos';

@injectable()
export class OrderApplicationService {
  constructor(@inject(DI_TOKENS.ORDER_REPOSITORY) private readonly repository: IOrderRepository) {}

  async createOrder(dto: CreateOrderDTO): Promise<string> {
    const order = new Order({ customerId: dto.customerId, orderItems: [] });
    await this.repository.save(order);
    return order.id;
  }

  async getOrderById(id: string): Promise<OrderDTO> {
    const order = await this.repository.getById(id);

    if (!order) {
      throw new NotFoundError('The request order is not found');
    }

    const orderItemDtos = order.orderItems.map(
      (orderItem: OrderItem) => new OrderItemDTO(orderItem.sku, orderItem.quantity, orderItem.unitPrice)
    );

    const dto: OrderDTO = new OrderDTO(order.id, order.customerId, orderItemDtos);
    return dto;
  }

  async addOrderItem(dto: AddOrderItemDTO): Promise<void> {
    const order = await this.repository.getById(dto.id);

    if (!order) {
      throw new NotFoundError('The request order is not found');
    }

    order.addOrderItem(dto.productId, dto.price, dto.quantity);

    await this.repository.save(order);
  }
}
