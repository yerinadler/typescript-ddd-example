import { Order } from '@domain/order/order';
import { IOrderDataMapper } from '@domain/order/order-data-mapper.interface';
import { OrderItem } from '@domain/order/order-item';
import { injectable } from 'inversify';
import { OrderOrmEntity } from '../orm-entities/order.entity';
import { OrderItemOrmEntity } from '../orm-entities/order-item.entity';

@injectable()
export class OrderDataMapper implements IOrderDataMapper {
  toDomain(dalEntity: OrderOrmEntity): Order {
    const orderItems: OrderItem[] = dalEntity.orderItems.map(
            (item: OrderItemOrmEntity) =>
                new OrderItem({ sku: item.sku, quantity: item.quantity, unitPrice: item.unitPrice }, item.id)
    );
    const entity: Order = new Order({ customerId: dalEntity.customerId, orderItems }, dalEntity.id);
    return entity;
  }

  toPersistence(entity: Order): OrderOrmEntity {
    const dalEntity: OrderOrmEntity = new OrderOrmEntity();
    dalEntity.id = entity.id;
    dalEntity.customerId = entity.customerId;
    if (entity.orderItems.length && !dalEntity.orderItems) {
      dalEntity.orderItems = [];
      entity.orderItems.forEach((item: OrderItem) => {
        const ormItem = new OrderItemOrmEntity();
        ormItem.id = item.id;
        ormItem.sku = item.sku;
        ormItem.quantity = item.quantity;
        ormItem.unitPrice = item.unitPrice;
        dalEntity.orderItems.push(ormItem);
      });
    }
    return dalEntity;
  }
}
