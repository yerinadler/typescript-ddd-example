import { v4 as uuid } from 'uuid';
import { IEntity } from './entity.interface';

export abstract class Entity implements IEntity {
  protected constructor(public readonly id: Guid = uuid()) {}
}
