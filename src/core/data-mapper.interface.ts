import { AggrgeateRoot } from "./aggregate-root";

export interface IDataMapper<TAggregateRoot extends AggrgeateRoot, TDalEntity> {
  toDomain(dalEntity: TDalEntity): TAggregateRoot;
  toPersistence(entity: TAggregateRoot): TDalEntity;
}