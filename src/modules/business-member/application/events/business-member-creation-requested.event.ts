export class BusinessMemberCreationRequestedEvent {
  constructor(
    public readonly businessId: string,
    public readonly userId: string,
    public readonly roleId: string,
    public readonly invitedBy?: string,
  ) {}
}