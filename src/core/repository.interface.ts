import { IAggregateRoot } from './aggregate-root.interface';

export interface IRepository<T extends IAggregateRoot> {
  find(filter?: any): T[] | Promise<T[]>;
  getById(id: Guid): T | Promise<T> | Promise<null>;
  save(aggregateRoot: T): void | Promise<void>;
  remove(id: Guid): void | Promise<void>;
}
