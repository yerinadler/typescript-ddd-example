import 'module-alias/register';
import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { IOrderRepository } from '@domain/order/order-repository.interface';
import { DI_TOKENS } from './di-tokens';
import { createAsync } from './inversify.config';

(async () => {
  const container = await createAsync();
  const repo: IOrderRepository = container.get<IOrderRepository>(DI_TOKENS.ORDER_REPOSITORY);
  const order = await repo.getById('44094726-5607-4f22-b7e5-d4c950056356');
  order?.addOrderItem('RG-5121BGR', 2900, 8);
  console.log(order);
  await repo.save(order!);
})();
