import { BusinessmemberEntity } from "@modules/business-member/domain/entities/business-member.entity";
import { BusinessmemberRepository } from "@modules/business-member/infrastructure/repositories/business-member.repository";
import { CreateBusinessmemberCommand } from "@modules/business-member/application/commands/create-business-member.command";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateBusinessmemberUseCase {
  constructor(private readonly repository: BusinessmemberRepository) {}

  async execute(command: CreateBusinessmemberCommand) {
    const entity = new BusinessmemberEntity(command);
    return this.repository.create(entity);
  }
}