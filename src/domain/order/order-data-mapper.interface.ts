import { IDataMapper } from "@core/data-mapper.interface";
import { OrderOrmEntity } from "@infrastructure/order/orm-entities/order.entity";
import { Order } from "./order";

export interface IOrderDataMapper extends IDataMapper<Order, OrderOrmEntity> {}