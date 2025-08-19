import { BusinessroleOrmEntity } from "@modules/business-role/infrastructure/orm-entities/business-role.orm-entity";
import { BusinessRole } from "@modules/business-role/domain/entities/business-role.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessroleMapper {
  toOrmEntity(domainEntity: BusinessRole): BusinessroleOrmEntity {
    if (!domainEntity) {
      throw new Error('Domain entity is required');
    }

    const ormEntity = new BusinessroleOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.isActive = true;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    ormEntity.deletedAt = domainEntity.deletedAt;
    ormEntity.business_id = domainEntity.businessId;
    ormEntity.name = domainEntity.name;
    ormEntity.description = domainEntity.description;
    ormEntity.permissions = domainEntity.permissions;
    ormEntity.is_system_role = domainEntity.isSystemRole;
    ormEntity.is_customizable = domainEntity.isCustomizable;
    ormEntity.hierarchy = domainEntity.hierarchy;
    ormEntity.metadata = domainEntity.metadata;
    
    return ormEntity;
  }

  toDomainEntity(ormEntity: BusinessroleOrmEntity): BusinessRole {
    if (!ormEntity) {
      throw new Error('ORM entity is required');
    }

    return new BusinessRole({
      id: ormEntity.id,
      businessId: ormEntity.business_id,
      name: ormEntity.name,
      description: ormEntity.description,
      permissions: ormEntity.permissions as any, // Type conversion needed
      isSystemRole: ormEntity.is_system_role,
      isCustomizable: ormEntity.is_customizable,
      hierarchy: ormEntity.hierarchy,
      metadata: ormEntity.metadata || {},
    });
  }
}