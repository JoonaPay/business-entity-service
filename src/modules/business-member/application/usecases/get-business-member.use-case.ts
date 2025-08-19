import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessMember } from '@modules/business-member/domain/entities/business-member.entity';
import { BusinessmemberRepository } from '@modules/business-member/infrastructure/repositories/business-member.repository';

@Injectable()
export class GetBusinessMemberUseCase {
  constructor(private readonly repository: BusinessmemberRepository) {}

  async execute(id: string): Promise<BusinessMember> {
    const member = await this.repository.findById(id);
    if (!member) {
      throw new NotFoundException(`Business member with id ${id} not found`);
    }
    return member;
  }
}
