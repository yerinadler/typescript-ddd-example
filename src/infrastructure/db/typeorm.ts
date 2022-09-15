import { createConnection } from 'typeorm';
import { OrderItemOrmEntity } from '../order/orm-entities/order-item.entity';
import { OrderOrmEntity } from '../order/orm-entities/order.entity';

export const createTypeOrmConnection = async (
  host: string,
  port: number,
  username: string,
  password: string,
  database: string
) =>
  createConnection({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: [OrderOrmEntity, OrderItemOrmEntity],
    synchronize: true,
    logging: false,
  });
