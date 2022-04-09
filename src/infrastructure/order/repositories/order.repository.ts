import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';
import { SqlRepository } from '@core/sql-repository';
import { Order } from '@domain/order/order';
import { IOrderDataMapper } from '@domain/order/order-data-mapper.interface';
import { IOrderRepository } from '@domain/order/order-repository.interface';
import { DI_TOKENS } from '@src/di-tokens';
import { OrderOrmEntity } from '../orm-entities/order.entity';

@injectable()
export class OrderRepository extends SqlRepository<Order, OrderOrmEntity> implements IOrderRepository {
  constructor(
    @inject(DI_TOKENS.DB_CONNECTION) private readonly dbConnection: Connection,
    @inject(DI_TOKENS.ORDER_DATA_MAPPER) private readonly dataMapper: IOrderDataMapper
  ) {
    super(dbConnection.getRepository(OrderOrmEntity), dataMapper);
  }
}
