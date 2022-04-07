import { IEntity } from "@src/core/entity.interface";
import { v4 as uuid } from 'uuid';

export interface IOrderItemProps {
  sku: string,
  unitPrice: number,
  quantity: number
}

export class OrderItem implements IEntity {

  public readonly id: Guid;
  private _sku: string;
  private _quantity: number;
  private _unitPrice: number;


  constructor(
    props: IOrderItemProps,
    id?: Guid
  ) {
    this.id = id || uuid();
    this._sku = props.sku;
    this._unitPrice = props.unitPrice;
    this._quantity = props.quantity;
  }

  get sku() {
    return this._sku;
  }

  get unitPrice() {
    return this._unitPrice;
  }

  get quantity() {
    return this._quantity;
  }

  adjustQuantity(newQuantity: number) {
    this._quantity = newQuantity;
  }

  adjustUnitPrice(newPrice: number) {
    this._unitPrice = newPrice;
  }
}