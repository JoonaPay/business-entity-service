import { BusinessInvitationOrmEntity } from '@modules/business-invitation/infrastructure/orm-entities';
import { BusinessInvitation } from '@modules/business-invitation/domain/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BusinessInvitationMapper {
  toOrmEntity(domainEntity: BusinessInvitation): BusinessInvitationOrmEntity {
    if (!domainEntity) {
      throw new Error('Domain entity is required');
    }

    const ormEntity = new BusinessInvitationOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.isActive = true; // Business invitations are always active when created
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    ormEntity.deletedAt = domainEntity.deletedAt;
    // Map your properties from camelCase to snake_case
    // Example: ormEntity.property_name = domainEntity.propertyName;

    return ormEntity;
  }

  toDomainEntity(ormEntity: BusinessInvitationOrmEntity): BusinessInvitation {
    // TODO: Implement proper mapping from ORM to domain entity
    throw new Error('Not implemented');
  }
}
