import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBusinessEntityUseCase } from '../usecases/create-business-entity.use-case';

export class CreateBusinessEntityCommand {
  constructor(
    public readonly name: string,
    public readonly legalName: string,
    public readonly legalStructure: string,
    public readonly businessType: string,
    public readonly industryCode: string,
    public readonly address: any,
    public readonly contactInfo: any,
    public readonly ownerId: string,
    public readonly description?: string,
  ) {}
}

@CommandHandler(CreateBusinessEntityCommand)
export class CreateBusinessEntityHandler
  implements ICommandHandler<CreateBusinessEntityCommand>
{
  constructor(private readonly useCase: CreateBusinessEntityUseCase) {}

  async execute(command: CreateBusinessEntityCommand) {
    return this.useCase.execute(command);
  }
}
