import { BusinessroleOrmEntity } from "@modules/business-role/infrastructure/orm-entities/business-role.orm-entity";
import { BusinessroleEntity } from "@modules/business-role/domain/entities/business-role.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessroleMapper {
  toOrmEntity(domainEntity: BusinessroleEntity): BusinessroleOrmEntity {
    if (!domainEntity) {
      throw new Error('Domain entity is required');
    }

    const ormEntity = new BusinessroleOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.isActive = domainEntity.isActive;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    ormEntity.deletedAt = domainEntity.deletedAt;
    // Map your properties from camelCase to snake_case
    // Example: ormEntity.property_name = domainEntity.propertyName;
    
    return ormEntity;
  }

  toDomainEntity(ormEntity: BusinessroleOrmEntity): BusinessroleEntity {
    const entity = new BusinessroleEntity({
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