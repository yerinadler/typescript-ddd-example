import { IEntity } from "./entity.interface";

export abstract class AggrgeateRoot implements IEntity {
  constructor(
    public readonly id: Guid
  ) {}
}