import { BusinessentityOrmEntity } from "@modules/business-entity/infrastructure/orm-entities/business-entity.orm-entity";
import { BusinessentityEntity } from "@modules/business-entity/domain/entities/business-entity.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessentityMapper {
  toOrmEntity(domainEntity: BusinessentityEntity): BusinessentityOrmEntity {
    if (!domainEntity) {
      throw new Error('Domain entity is required');
    }

    const ormEntity = new BusinessentityOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.isActive = domainEntity.isActive;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    ormEntity.deletedAt = domainEntity.deletedAt;
    // Map your properties from camelCase to snake_case
    // Example: ormEntity.property_name = domainEntity.propertyName;
    
    return ormEntity;
  }

  toDomainEntity(ormEntity: BusinessentityOrmEntity): BusinessentityEntity {
    const entity = new BusinessentityEntity({
      id: ormEntity.id,
      isActive: ormEntity.isActive,
      createdAt: ormEntity.createdAt,
      updatedAt: ormEntity.updatedAt,
      deletedAt: ormEntity.deletedAt,
      // Map your properties from snake_case to camelCase
      // Example: propertyName: ormEntity.property_name,
    });
    
    return entity;
  }
}