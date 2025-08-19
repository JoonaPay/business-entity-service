import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BusinessMemberCreationRequestedEvent } from '../events/business-member-creation-requested.event';
import { CreateBusinessmemberUseCase } from '../usecases/create-business-member.use-case';
import { CreateBusinessmemberCommand } from '../commands/create-business-member.command';

@EventsHandler(BusinessMemberCreationRequestedEvent)
export class BusinessMemberCreationHandler implements IEventHandler<BusinessMemberCreationRequestedEvent> {
  constructor(
    private readonly createBusinessMemberUseCase: CreateBusinessmemberUseCase,
  ) {}

  async handle(event: BusinessMemberCreationRequestedEvent) {
    // Use the SAME use case that the controller uses
    const command = new CreateBusinessmemberCommand({
      businessId: event.businessId,
      userId: event.userId,
      roleId: event.roleId,
      invitedBy: event.invitedBy,
    } as any, 'system');
    
    return this.createBusinessMemberUseCase.execute(command);
  }
}