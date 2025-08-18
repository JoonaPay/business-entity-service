import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBusinessroleUseCase } from "@modules/business-role/application/usecases/create-business-role.use-case";
import { CreateBusinessroleDto } from "@modules/business-role/application/dto/requests/create-business-role.dto";

export class CreateBusinessroleCommand {
  // Add your command properties here
  // They should match your entity properties in camelCase
  
  constructor(
    data: CreateBusinessroleDto,
    public readonly contextId: string, // e.g., userId, tenantId
  ) {
    // Transform snake_case DTO to camelCase command properties
    // Example: this.propertyName = data.property_name;
  }
}

@CommandHandler(CreateBusinessroleCommand)
export class CreateBusinessroleHandler
  implements ICommandHandler<CreateBusinessroleCommand>
{
  constructor(private readonly useCase: CreateBusinessroleUseCase) {}

  async execute(command: CreateBusinessroleCommand) {
    return this.useCase.execute(command);
  }
}