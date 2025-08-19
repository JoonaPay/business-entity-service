import { BaseDomainEntity } from '../domain/base-domain-entity';
import { BaseOrmEntity } from './base-orm-entity';

export abstract class BaseMapper<
  DomainEntity extends BaseDomainEntity,
  OrmEntity extends BaseOrmEntity,
> {
  abstract toOrm(domainEntity: DomainEntity): OrmEntity;
  abstract toDomain(ormEntity: OrmEntity): DomainEntity;

  public toOrmList(domainEntities: DomainEntity[]): OrmEntity[] {
    return domainEntities.map((entity) => this.toOrm(entity));
  }

  public toDomainList(ormEntities: OrmEntity[]): DomainEntity[] {
    return ormEntities.map((entity) => this.toDomain(entity));
  }
}
