import { IAggregateRoot } from '@core/aggregate-root.interface';
import { Entity } from '@core/entity';

import { OrderItem } from './order-item';

export interface IOrderProps {
  customerId: Guid;
  orderItems: OrderItem[];
}

export class Order extends Entity implements IAggregateRoot {
  private _customerId: Guid;
  private _orderItems: OrderItem[] = [];

  constructor(orderProps: IOrderProps, id?: Guid) {
    super(id);
    this._customerId = orderProps.customerId;
    if (orderProps.orderItems.length) {
      this._orderItems = orderProps.orderItems;
    }
  }

  get customerId() {
    return this._customerId;
  }

  get orderItems() {
    return this._orderItems;
  }

  public getTotalPrice() {
    return this._orderItems.reduce((acc: number, item: OrderItem) => {
      return (acc += item.unitPrice * item.quantity);
    }, 0);
  }

  public addOrderItem(sku: string, unitPrice: number, quantity: number) {
    const item = this._orderItems.find((item: OrderItem) => item.sku === sku);
    if (item) {
      item.adjustQuantity(item.quantity + quantity);
      if (unitPrice !== item.unitPrice) {
        item.adjustUnitPrice(unitPrice);
      }
      return;
    }
    this._orderItems.push(new OrderItem({ sku, unitPrice, quantity }));
  }
}
