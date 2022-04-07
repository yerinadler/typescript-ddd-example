import { IRepository } from "@core/repository.interface";
import { Order } from "./order";

export interface IOrderRepository extends IRepository<Order> {}