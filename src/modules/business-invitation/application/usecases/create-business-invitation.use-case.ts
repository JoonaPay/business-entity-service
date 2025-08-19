import { BusinessInvitation } from '@modules/business-invitation/domain/entities';
import { BusinessInvitationRepository } from '@modules/business-invitation/infrastructure/repositories';
import { CreateBusinessInvitationCommand } from '@modules/business-invitation/application/commands';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateBusinessInvitationUseCase {
  constructor(private readonly repository: BusinessInvitationRepository) {}

  async execute(command: CreateBusinessInvitationCommand) {
    // TODO: Implement proper entity creation with business logic
    throw new Error('Not implemented');
  }
}
