import { BusinessmemberOrmEntity } from '@modules/business-member/infrastructure/orm-entities/business-member.orm-entity';
import { BusinessMember } from '@modules/business-member/domain/entities/business-member.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BusinessmemberMapper {
  toOrmEntity(domainEntity: BusinessMember): BusinessmemberOrmEntity {
    if (!domainEntity) {
      throw new Error('Domain entity is required');
    }

    const ormEntity = new BusinessmemberOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.isActive = domainEntity.status === 'ACTIVE';
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    ormEntity.deletedAt = domainEntity.deletedAt;
    ormEntity.business_id = domainEntity.businessId;
    ormEntity.user_id = domainEntity.userId;
    ormEntity.role_id = domainEntity.roleId;
    ormEntity.status = domainEntity.status;
    ormEntity.joined_at = domainEntity.joinedAt;
    ormEntity.invited_by = domainEntity.invitedBy;
    ormEntity.permissions = domainEntity.permissions as any;
    ormEntity.is_owner = domainEntity.isOwner;
    ormEntity.metadata = domainEntity.metadata;
    ormEntity.last_activity_at = domainEntity.lastActivityAt;
    ormEntity.activity_history = domainEntity.activityHistory;

    return ormEntity;
  }

  toDomainEntity(ormEntity: BusinessmemberOrmEntity): BusinessMember {
    if (!ormEntity) {
      throw new Error('ORM entity is required');
    }

    return new BusinessMember({
      id: ormEntity.id,
      businessId: ormEntity.business_id,
      userId: ormEntity.user_id,
      roleId: ormEntity.role_id,
      status: ormEntity.status as any,
      joinedAt: ormEntity.joined_at,
      invitedBy: ormEntity.invited_by,
      permissions: ormEntity.permissions as any,
      isOwner: ormEntity.is_owner,
      metadata: ormEntity.metadata || {},
      lastActivityAt: ormEntity.last_activity_at,
      activityHistory: ormEntity.activity_history || [],
    });
  }
}
