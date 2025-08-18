import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBusinessinvitationUseCase } from "@modules/business-invitation/application/usecases/create-business-invitation.use-case";
import { CreateBusinessinvitationDto } from "@modules/business-invitation/application/dto/requests/create-business-invitation.dto";

export class CreateBusinessinvitationCommand {
  // Add your command properties here
  // They should match your entity properties in camelCase
  
  constructor(
    data: CreateBusinessinvitationDto,
    public readonly contextId: string, // e.g., userId, tenantId
  ) {
    // Transform snake_case DTO to camelCase command properties
    // Example: this.propertyName = data.property_name;
  }
}

@CommandHandler(CreateBusinessinvitationCommand)
export class CreateBusinessinvitationHandler
  implements ICommandHandler<CreateBusinessinvitationCommand>
{
  constructor(private readonly useCase: CreateBusinessinvitationUseCase) {}

  async execute(command: CreateBusinessinvitationCommand) {
    return this.useCase.execute(command);
  }
}