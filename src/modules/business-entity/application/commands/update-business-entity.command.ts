import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBusinessEntityUseCase } from '../usecases/update-business-entity.use-case';

export class UpdateBusinessEntityCommand {
  constructor(
    public readonly id: string,
    public readonly description?: string,
    public readonly address?: any,
    public readonly contactInfo?: any,
    public readonly settings?: any,
  ) {}
}

@CommandHandler(UpdateBusinessEntityCommand)
export class UpdateBusinessEntityHandler
  implements ICommandHandler<UpdateBusinessEntityCommand>
{
  constructor(private readonly useCase: UpdateBusinessEntityUseCase) {}

  async execute(command: UpdateBusinessEntityCommand) {
    return this.useCase.execute(command);
  }
}
