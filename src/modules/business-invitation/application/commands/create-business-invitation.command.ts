import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBusinessInvitationUseCase } from "@modules/business-invitation/application/usecases";
import { CreateBusinessInvitationDto } from "@modules/business-invitation/application/dto/requests";

export class CreateBusinessInvitationCommand {
  public readonly businessId: string;
  public readonly email: string;
  public readonly roleId: string;
  public readonly invitedBy: string;
  public readonly message?: string;
  
  constructor(
    data: CreateBusinessInvitationDto,
    public readonly contextId: string,
  ) {
    this.businessId = data.businessId;
    this.email = data.email;
    this.roleId = data.roleId;
    this.invitedBy = data.invitedBy;
    this.message = data.message;
  }
}

@CommandHandler(CreateBusinessInvitationCommand)
export class CreateBusinessInvitationHandler
  implements ICommandHandler<CreateBusinessInvitationCommand>
{
  constructor(private readonly useCase: CreateBusinessInvitationUseCase) {}

  async execute(command: CreateBusinessInvitationCommand) {
    return this.useCase.execute(command);
  }
}