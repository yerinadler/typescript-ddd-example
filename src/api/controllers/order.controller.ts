import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';
import { AddOrderItemDTO, CreateOrderDTO } from '@src/application/order/order.dtos';
import { OrderApplicationService } from '@src/application/order/order.service';
import { DI_TOKENS } from '@src/di-tokens';
import { ok } from '../utilities/responses';
import { addOrderItemValidationSchema, createOrderValidationSchema } from '../schemas/order';
import { celebrate, Segments } from 'celebrate';
import { UUIDField } from '../schemas/utilities';

@controller('/orders')
export class OrderController {
  constructor(@inject(DI_TOKENS.ORDER_APPLICATION_SERVICE) private readonly service: OrderApplicationService) {}

  @httpPost('', celebrate({
    [Segments.BODY]: createOrderValidationSchema
  }))
  async createOrder(@request() req: Request, @response() res: Response) {
    const orderId = await this.service.createOrder(new CreateOrderDTO(req.body.customerId));
    res.json(ok('Successfully created the order', orderId));
  }

  @httpGet('/:id')
  async getOrderById(@request() req: Request, @response() res: Response) {
    const order = await this.service.getOrderById(req.params.id);
    res.json(ok('Successfully retrieved the requested order', { ...order }));
  }

  @httpPut('/:id', celebrate({
    [Segments.BODY]: addOrderItemValidationSchema,
    [Segments.PARAMS]: UUIDField()
  }))
  async addOrderItem(@request() req: Request, @response() res: Response) {
    await this.service.addOrderItem(new AddOrderItemDTO(req.params.id, req.body.productId, req.body.quantity, req.body.price));
    res.json(ok('Successfully added the item to the order', undefined));
  }
}
