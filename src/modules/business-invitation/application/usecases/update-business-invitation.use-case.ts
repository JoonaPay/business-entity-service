import { BusinessinvitationEntity } from "@modules/business-invitation/domain/entities/business-invitation.entity";
import { BusinessinvitationRepository } from "@modules/business-invitation/infrastructure/repositories/business-invitation.repository";
import { CreateBusinessinvitationCommand } from "@modules/business-invitation/application/commands/create-business-invitation.command";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateBusinessinvitationUseCase {
  constructor(private readonly repository: BusinessinvitationRepository) {}

  async execute(command: CreateBusinessinvitationCommand) {
    const entity = new BusinessinvitationEntity(command);
    return this.repository.create(entity);
  }
}