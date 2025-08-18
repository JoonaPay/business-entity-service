import { BusinessinvitationOrmEntity } from "@modules/business-invitation/infrastructure/orm-entities/business-invitation.orm-entity";
import { BusinessinvitationEntity } from "@modules/business-invitation/domain/entities/business-invitation.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessinvitationMapper {
  toOrmEntity(domainEntity: BusinessinvitationEntity): BusinessinvitationOrmEntity {
    if (!domainEntity) {
      throw new Error('Domain entity is required');
    }

    const ormEntity = new BusinessinvitationOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.isActive = domainEntity.isActive;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    ormEntity.deletedAt = domainEntity.deletedAt;
    // Map your properties from camelCase to snake_case
    // Example: ormEntity.property_name = domainEntity.propertyName;
    
    return ormEntity;
  }

  toDomainEntity(ormEntity: BusinessinvitationOrmEntity): BusinessinvitationEntity {
    const entity = new BusinessinvitationEntity({
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