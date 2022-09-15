import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Connection } from 'typeorm';
import { OrderDataMapper } from '@infrastructure/order/data-mappers/order.data-mapper';
import { OrderRepository } from '@infrastructure/order/repositories/order.repository';
import { initialiseApiServer } from './api/setup';
import { OrderApplicationService } from './application/order/order.service';
import config from './config';
import { DI_TOKENS } from './di-tokens';
import { createTypeOrmConnection } from './infrastructure/db/typeorm';

import '@api/controllers';

export const createAsync = async () => {
  const container = new Container();

  const { host, port, username, password, database } = config.postgres;
  const dbConnection: Connection = await createTypeOrmConnection(host, +port, username, password, database);
  container.bind(DI_TOKENS.DB_CONNECTION).toConstantValue(dbConnection);
  container.bind(DI_TOKENS.ORDER_DATA_MAPPER).to(OrderDataMapper).inSingletonScope();
  container.bind(DI_TOKENS.ORDER_REPOSITORY).to(OrderRepository).inSingletonScope();
  container.bind(DI_TOKENS.ORDER_APPLICATION_SERVICE).to(OrderApplicationService).inSingletonScope();

  const server = new InversifyExpressServer(container);
  initialiseApiServer(server);
  const app = server.build();
  app.listen(config.port, () => {
    console.log('The application is running on the port %s', config.port);
  });

  return container;
};
