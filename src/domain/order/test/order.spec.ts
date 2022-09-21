import { Order } from '../order';
import { OrderItem } from '../order-item';

describe('order aggregate root', () => {
  it('should create an instance', () => {
    const order = new Order({ customerId: 'xxxx', orderItems: [] }, 'test-id');
    expect(order).toBeDefined();
  });
  it('should create order item correctly', () => {
    const order = new Order({ customerId: 'xxxx', orderItems: [] }, 'test-id');
    order.addOrderItem('test-sku-id', 1, 1);
    expect(order.orderItems).toHaveLength(1);
  });
  it('should create order item of the OrderItem entity instance correctly', () => {
    const order = new Order({ customerId: 'xxxx', orderItems: [] }, 'test-id');
    order.addOrderItem('test-sku-id', 1, 1);
    expect(order.orderItems[0]).toBeInstanceOf(OrderItem);
  });
  it('should update order item with the same id if the price changes', () => {
    const order = new Order({ customerId: 'xxxx', orderItems: [] }, 'test-id');
    order.addOrderItem('test-sku-id', 1, 1);
    order.addOrderItem('test-sku-id', 10, 1);
    expect(order.orderItems[0].unitPrice).toEqual(10);
    expect(order.orderItems[0].quantity).toEqual(2);
  });
  it('should calculate the total price correctly', () => {
    const order = new Order({ customerId: 'xxxx', orderItems: [] }, 'test-id');
    order.addOrderItem('test-sku-id', 1, 1);
    order.addOrderItem('test-sku-id', 10, 1);
    expect(order.getTotalPrice()).toEqual(20);
  });
});
