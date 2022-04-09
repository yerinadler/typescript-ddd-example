import { OrderDataMapper } from '@infrastructure/order/data-mappers/order.data-mapper';
import { OrderRepository } from '@infrastructure/order/repositories/order.repository';
import { Container } from 'inversify';
import { Connection } from 'typeorm';
import config from './config';
import { DI_TOKENS } from './di-tokens';
import { createTypeOrmConnection } from './infrastructure/db/typeorm';

export const createAsync = async () => {
  const container = new Container();

  const { host, port, username, password, database } = config.postgres;
  const dbConnection: Connection = await createTypeOrmConnection(host, +port, username, password, database);
  console.log(dbConnection);
  container.bind(DI_TOKENS.DB_CONNECTION).toConstantValue(dbConnection);
  container.bind(DI_TOKENS.ORDER_DATA_MAPPER).to(OrderDataMapper).inSingletonScope();
  container.bind(DI_TOKENS.ORDER_REPOSITORY).to(OrderRepository).inSingletonScope();

  return container;
};
