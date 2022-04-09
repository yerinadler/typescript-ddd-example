import { Entity } from '@core/entity';

export interface IOrderItemProps {
  sku: string;
  unitPrice: number;
  quantity: number;
}

export class OrderItem extends Entity {
  private _sku: string;
  private _quantity: number;
  private _unitPrice: number;

  constructor(props: IOrderItemProps, id?: Guid) {
    super(id);
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
