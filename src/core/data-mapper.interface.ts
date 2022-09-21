import { IAggregateRoot } from './aggregate-root.interface';

export interface IDataMapper<TAggregateRoot extends IAggregateRoot, TDalEntity> {
  toDomain(dalEntity: TDalEntity): TAggregateRoot;
  toPersistence(entity: TAggregateRoot): TDalEntity;
}
