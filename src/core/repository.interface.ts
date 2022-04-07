import { AggrgeateRoot } from "./aggregate-root";

export interface IRepository<T extends AggrgeateRoot> {
  find(filter?: any): T[] | Promise<T[]>;
  getById(id: Guid): T | Promise<T> | Promise<null>;
  save(aggregateRoot: T): void | Promise<void>;
  remove(aggregateRoot: T): void | Promise<void>;
}