import { BusinessMember } from '@modules/business-member/domain/entities/business-member.entity';
import { BusinessmemberRepository } from '@modules/business-member/infrastructure/repositories/business-member.repository';
import { CreateBusinessmemberCommand } from '@modules/business-member/application/commands/create-business-member.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateBusinessmemberUseCase {
  constructor(private readonly repository: BusinessmemberRepository) {}

  async execute(command: CreateBusinessmemberCommand): Promise<BusinessMember> {
    // Create a basic business member
    const businessMember = new BusinessMember({
      businessId: 'business-id',
      userId: 'user-id',
      roleId: 'role-id',
      status: 'PENDING' as any,
      joinedAt: new Date(),
      permissions: [],
      isOwner: false,
      metadata: {},
      activityHistory: [],
    });

    return this.repository.create(businessMember);
  }
}
