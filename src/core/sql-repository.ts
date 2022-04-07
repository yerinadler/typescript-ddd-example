import { injectable, unmanaged } from "inversify";
import { Repository as TypeormRepository } from "typeorm";
import { AggrgeateRoot } from "./aggregate-root";
import { IDataMapper } from "./data-mapper.interface";
import { IRepository } from "./repository.interface";

@injectable()
export class SqlRepository<TDomainEntity extends AggrgeateRoot, TDalEntity> implements IRepository<TDomainEntity> {
  constructor(
    @unmanaged() private readonly _ormRepository: TypeormRepository<TDalEntity>,
    @unmanaged() private readonly _dataMapper: IDataMapper<TDomainEntity, TDalEntity>
  ) {}

  async find(filter?: any): Promise<TDomainEntity[]> {
    const dbResult: TDalEntity[] = await this._ormRepository.find({ where: { ...filter } });
    return dbResult.map((item: TDalEntity) => this._dataMapper.toDomain(item));
  }

  async getById(id: Guid): Promise<TDomainEntity> {
    const dbResult = await this._ormRepository.findOne(id) as TDalEntity;
    return this._dataMapper.toDomain(dbResult);
  }

  async save(aggregateRoot: TDomainEntity): Promise<void> {
    const dalObject = this._dataMapper.toPersistence(aggregateRoot) as TDalEntity;
    await this._ormRepository.save(dalObject as any);
  }

  async remove(aggregateRoot: TDomainEntity): Promise<void> {
    await this._ormRepository.softDelete(aggregateRoot.id);
  }
}