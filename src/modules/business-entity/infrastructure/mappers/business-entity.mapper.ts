import { BusinessEntityOrmEntity } from "@modules/business-entity/infrastructure/orm-entities";
import { BusinessEntity } from "@modules/business-entity/domain/entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessEntityMapper {
  toOrmEntity(domainEntity: BusinessEntity): BusinessEntityOrmEntity {
    if (!domainEntity) {
      throw new Error('Domain entity is required');
    }

    const ormEntity = new BusinessEntityOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.isActive = domainEntity.isActive();
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    ormEntity.deletedAt = domainEntity.deletedAt;
    // Map your properties from camelCase to snake_case
    // Example: ormEntity.property_name = domainEntity.propertyName;
    
    return ormEntity;
  }

  toDomainEntity(ormEntity: BusinessEntityOrmEntity): BusinessEntity {
    const entity = BusinessEntity.createRootOrganization(
      'temp',
      'temp',
      'LLC' as any,
      'temp',
      {} as any,
      {} as any,
      'temp'
    );
    // TODO: Map properties properly from ORM entity
    return entity;
  }
}