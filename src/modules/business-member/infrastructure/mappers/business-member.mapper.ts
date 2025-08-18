import { BusinessmemberOrmEntity } from "@modules/business-member/infrastructure/orm-entities/business-member.orm-entity";
import { BusinessmemberEntity } from "@modules/business-member/domain/entities/business-member.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessmemberMapper {
  toOrmEntity(domainEntity: BusinessmemberEntity): BusinessmemberOrmEntity {
    if (!domainEntity) {
      throw new Error('Domain entity is required');
    }

    const ormEntity = new BusinessmemberOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.isActive = domainEntity.isActive;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    ormEntity.deletedAt = domainEntity.deletedAt;
    // Map your properties from camelCase to snake_case
    // Example: ormEntity.property_name = domainEntity.propertyName;
    
    return ormEntity;
  }

  toDomainEntity(ormEntity: BusinessmemberOrmEntity): BusinessmemberEntity {
    const entity = new BusinessmemberEntity({
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