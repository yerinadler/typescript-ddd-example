export class CreateOrderDTO {
  constructor(public readonly customerId: string) {}
}

export class AddOrderItemDTO {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly price: number
  ) {}
}

export class OrderItemDTO {
  constructor(public readonly productId: string, public readonly quantity: number, public readonly price: number) {}
}

export class OrderDTO {
  constructor(public readonly id: string, public readonly customerId: string, public readonly orderItems?: OrderItemDTO[]) {}
}
