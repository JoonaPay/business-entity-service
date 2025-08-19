import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBusinessEntityUseCase } from '../usecases/delete-business-entity.use-case';

export class DeleteBusinessEntityCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteBusinessEntityCommand)
export class DeleteBusinessEntityHandler
  implements ICommandHandler<DeleteBusinessEntityCommand>
{
  constructor(private readonly useCase: DeleteBusinessEntityUseCase) {}

  async execute(command: DeleteBusinessEntityCommand) {
    return this.useCase.execute(command.id);
  }
}
