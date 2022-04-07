

import { v4 as uuid } from 'uuid';
import { IOrderItemProps, OrderItem } from "./order-item";
import { AggrgeateRoot } from "@core/aggregate-root";

export interface IOrderProps {
  customerId: Guid,
  orderItems: OrderItem[]
}

export class Order extends AggrgeateRoot {

  private _customerId: Guid;
  private _orderItems: OrderItem[] = [];

  constructor(
    orderProps: IOrderProps,
    id?: Guid
  ) {
    super(id || uuid());
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
      return acc += item.unitPrice * item.quantity;
    }, 0)
  }

  public addOrderItem(sku: string, unitPrice: number, quantity: number) {
    const index: number = this._orderItems.findIndex((item: OrderItem) => item.sku === sku);
    if (index !== -1) {
      
      const item = this._orderItems[index];
      console.log(item);
      item.adjustQuantity(item.quantity + quantity);
      if (unitPrice !== item.unitPrice) {
        item.adjustUnitPrice(unitPrice);
      }
      return;
    }
    this._orderItems.push(new OrderItem({ sku, unitPrice, quantity }));
  }
}