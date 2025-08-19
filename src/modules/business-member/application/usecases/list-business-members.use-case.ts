import { Injectable } from '@nestjs/common';
import { BusinessMember } from '@modules/business-member/domain/entities/business-member.entity';
import { BusinessmemberRepository } from '@modules/business-member/infrastructure/repositories/business-member.repository';

@Injectable()
export class ListBusinessMembersUseCase {
  constructor(private readonly repository: BusinessmemberRepository) {}

  async execute(): Promise<BusinessMember[]> {
    return this.repository.findAll();
  }
}
