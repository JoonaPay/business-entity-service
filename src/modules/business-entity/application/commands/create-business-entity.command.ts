import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBusinessentityUseCase } from "@modules/business-entity/application/usecases/create-business-entity.use-case";
import { CreateBusinessentityDto } from "@modules/business-entity/application/dto/requests/create-business-entity.dto";

export class CreateBusinessentityCommand {
  // Add your command properties here
  // They should match your entity properties in camelCase
  
  constructor(
    data: CreateBusinessentityDto,
    public readonly contextId: string, // e.g., userId, tenantId
  ) {
    // Transform snake_case DTO to camelCase command properties
    // Example: this.propertyName = data.property_name;
  }
}

@CommandHandler(CreateBusinessentityCommand)
export class CreateBusinessentityHandler
  implements ICommandHandler<CreateBusinessentityCommand>
{
  constructor(private readonly useCase: CreateBusinessentityUseCase) {}

  async execute(command: CreateBusinessentityCommand) {
    return this.useCase.execute(command);
  }
}