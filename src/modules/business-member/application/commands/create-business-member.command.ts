import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBusinessmemberUseCase } from "@modules/business-member/application/usecases/create-business-member.use-case";
import { CreateBusinessmemberDto } from "@modules/business-member/application/dto/requests/create-business-member.dto";

export class CreateBusinessmemberCommand {
  // Add your command properties here
  // They should match your entity properties in camelCase
  
  constructor(
    data: CreateBusinessmemberDto,
    public readonly contextId: string, // e.g., userId, tenantId
  ) {
    // Transform snake_case DTO to camelCase command properties
    // Example: this.propertyName = data.property_name;
  }
}

@CommandHandler(CreateBusinessmemberCommand)
export class CreateBusinessmemberHandler
  implements ICommandHandler<CreateBusinessmemberCommand>
{
  constructor(private readonly useCase: CreateBusinessmemberUseCase) {}

  async execute(command: CreateBusinessmemberCommand) {
    return this.useCase.execute(command);
  }
}