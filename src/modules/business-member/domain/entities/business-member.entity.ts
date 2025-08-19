import { BaseDomainEntity } from '../../../../core/domain/base-domain-entity';
import { Permission } from '../../../business-role/domain/entities/business-role.entity';

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
}

export interface MemberActivity {
  action: string;
  timestamp: Date;
  details?: Record<string, any>;
}

export interface BusinessMemberProps {
  id?: string;
  businessId: string;
  userId: string;
  roleId: string;
  status: MemberStatus;
  joinedAt: Date;
  invitedBy?: string;
  permissions: Permission[];
  isOwner: boolean;
  metadata: Record<string, any>;
  lastActivityAt?: Date;
  activityHistory: MemberActivity[];
}

export class BusinessMember extends BaseDomainEntity {
  private readonly _businessId: string;
  private readonly _userId: string;
  private _roleId: string;
  private _status: MemberStatus;
  private readonly _joinedAt: Date;
  private readonly _invitedBy?: string;
  private _permissions: Permission[];
  private _isOwner: boolean;
  private _metadata: Record<string, any>;
  private _lastActivityAt?: Date;
  private _activityHistory: MemberActivity[];

  constructor(props: BusinessMemberProps) {
    super(props.id);

    this._businessId = props.businessId;
    this._userId = props.userId;
    this._roleId = props.roleId;
    this._status = props.status;
    this._joinedAt = props.joinedAt;
    this._invitedBy = props.invitedBy;
    this._permissions = [...props.permissions];
    this._isOwner = props.isOwner;
    this._metadata = props.metadata || {};
    this._lastActivityAt = props.lastActivityAt;
    this._activityHistory = props.activityHistory || [];

    this.validateBusinessRules();
  }

  get businessId(): string {
    return this._businessId;
  }

  get userId(): string {
    return this._userId;
  }

  get roleId(): string {
    return this._roleId;
  }

  get status(): MemberStatus {
    return this._status;
  }

  get joinedAt(): Date {
    return this._joinedAt;
  }

  get invitedBy(): string | undefined {
    return this._invitedBy;
  }

  get permissions(): Permission[] {
    return [...this._permissions];
  }

  get isOwner(): boolean {
    return this._isOwner;
  }

  get metadata(): Record<string, any> {
    return this._metadata;
  }

  get lastActivityAt(): Date | undefined {
    return this._lastActivityAt;
  }

  get activityHistory(): MemberActivity[] {
    return [...this._activityHistory];
  }

  public changeRole(newRoleId: string, newPermissions: Permission[]): void {
    if (this._isOwner) {
      throw new Error('Owner role cannot be changed');
    }

    const oldRoleId = this._roleId;
    this._roleId = newRoleId;
    this._permissions = [...newPermissions];

    this.addActivity('ROLE_CHANGED', {
      oldRoleId,
      newRoleId,
      permissions: newPermissions,
    });

    this.touch();
  }

  public updatePermissions(permissions: Permission[]): void {
    if (this._isOwner) {
      throw new Error('Owner permissions cannot be modified');
    }

    const oldPermissions = [...this._permissions];
    this._permissions = [...permissions];

    this.addActivity('PERMISSIONS_UPDATED', {
      oldPermissions,
      newPermissions: permissions,
    });

    this.touch();
  }

  public activate(): void {
    if (this._status === MemberStatus.ACTIVE) {
      return;
    }

    if (this._status === MemberStatus.PENDING) {
      throw new Error('Pending members must be accepted first');
    }

    this._status = MemberStatus.ACTIVE;
    this.addActivity('MEMBER_ACTIVATED');
    this.touch();
  }

  public deactivate(): void {
    if (this._isOwner) {
      throw new Error('Business owner cannot be deactivated');
    }

    if (this._status === MemberStatus.INACTIVE) {
      return;
    }

    this._status = MemberStatus.INACTIVE;
    this.addActivity('MEMBER_DEACTIVATED');
    this.touch();
  }

  public suspend(reason?: string): void {
    if (this._isOwner) {
      throw new Error('Business owner cannot be suspended');
    }

    if (this._status === MemberStatus.SUSPENDED) {
      return;
    }

    this._status = MemberStatus.SUSPENDED;
    this.addActivity('MEMBER_SUSPENDED', { reason });
    this.touch();
  }

  public unsuspend(): void {
    if (this._status !== MemberStatus.SUSPENDED) {
      throw new Error('Only suspended members can be unsuspended');
    }

    this._status = MemberStatus.ACTIVE;
    this.addActivity('MEMBER_UNSUSPENDED');
    this.touch();
  }

  public acceptInvitation(): void {
    if (this._status !== MemberStatus.PENDING) {
      throw new Error('Only pending members can accept invitation');
    }

    this._status = MemberStatus.ACTIVE;
    this.addActivity('INVITATION_ACCEPTED');
    this.touch();
  }

  public transferOwnership(newOwnerId: string): void {
    if (!this._isOwner) {
      throw new Error('Only the current owner can transfer ownership');
    }

    if (this._userId === newOwnerId) {
      throw new Error('Cannot transfer ownership to the same user');
    }

    this._isOwner = false;
    this.addActivity('OWNERSHIP_TRANSFERRED', {
      newOwnerId,
      previousOwner: this._userId,
    });

    this.touch();
  }

  public receiveOwnership(fromUserId: string): void {
    if (this._isOwner) {
      throw new Error('User is already an owner');
    }

    this._isOwner = true;
    this._status = MemberStatus.ACTIVE;

    this.addActivity('OWNERSHIP_RECEIVED', {
      fromUserId,
      newOwner: this._userId,
    });

    this.touch();
  }

  public hasPermission(permission: Permission): boolean {
    return (
      this._permissions.includes(permission) ||
      this._permissions.includes(Permission.ADMIN_FULL_ACCESS) ||
      this._isOwner
    );
  }

  public hasAllPermissions(permissions: Permission[]): boolean {
    if (
      this._isOwner ||
      this._permissions.includes(Permission.ADMIN_FULL_ACCESS)
    ) {
      return true;
    }

    return permissions.every((permission) =>
      this._permissions.includes(permission),
    );
  }

  public hasAnyPermission(permissions: Permission[]): boolean {
    if (
      this._isOwner ||
      this._permissions.includes(Permission.ADMIN_FULL_ACCESS)
    ) {
      return true;
    }

    return permissions.some((permission) =>
      this._permissions.includes(permission),
    );
  }

  public canManageMember(targetMember: BusinessMember): boolean {
    if (this._isOwner) {
      return true;
    }

    if (targetMember._isOwner) {
      return false;
    }

    if (this._userId === targetMember._userId) {
      return false;
    }

    return this.hasPermission(Permission.MEMBER_MANAGE);
  }

  public canRemoveMember(targetMember: BusinessMember): boolean {
    if (this._isOwner) {
      return !targetMember._isOwner;
    }

    if (targetMember._isOwner) {
      return false;
    }

    if (this._userId === targetMember._userId) {
      return false;
    }

    return this.hasPermission(Permission.MEMBER_REMOVE);
  }

  public updateMetadata(metadata: Record<string, any>): void {
    this._metadata = { ...this._metadata, ...metadata };
    this.addActivity('METADATA_UPDATED', { metadata });
    this.touch();
  }

  public recordActivity(action: string, details?: Record<string, any>): void {
    this.addActivity(action, details);
    this._lastActivityAt = new Date();
    this.touch();
  }

  public isActive(): boolean {
    return this._status === MemberStatus.ACTIVE;
  }

  public isPending(): boolean {
    return this._status === MemberStatus.PENDING;
  }

  public isSuspended(): boolean {
    return this._status === MemberStatus.SUSPENDED;
  }

  public getRecentActivity(days: number = 30): MemberActivity[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this._activityHistory
      .filter((activity) => activity.timestamp >= cutoffDate)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  public getDaysSinceLastActivity(): number {
    if (!this._lastActivityAt) {
      return Infinity;
    }

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this._lastActivityAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private addActivity(action: string, details?: Record<string, any>): void {
    const activity: MemberActivity = {
      action,
      timestamp: new Date(),
      details,
    };

    this._activityHistory.push(activity);

    if (this._activityHistory.length > 1000) {
      this._activityHistory = this._activityHistory.slice(-1000);
    }

    this._lastActivityAt = activity.timestamp;
  }

  private validateBusinessRules(): void {
    if (!this._businessId || this._businessId.trim().length === 0) {
      throw new Error('Business ID is required');
    }

    if (!this._userId || this._userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    if (!this._roleId || this._roleId.trim().length === 0) {
      throw new Error('Role ID is required');
    }

    if (!this._joinedAt || this._joinedAt > new Date()) {
      throw new Error('Join date cannot be in the future');
    }

    if (!this._permissions || this._permissions.length === 0) {
      throw new Error('Member must have at least one permission');
    }

    if (this._isOwner && this._status !== MemberStatus.ACTIVE) {
      throw new Error('Business owner must have ACTIVE status');
    }

    const uniquePermissions = new Set(this._permissions);
    if (uniquePermissions.size !== this._permissions.length) {
      throw new Error('Duplicate permissions are not allowed');
    }
  }

  public static createOwner(
    businessId: string,
    userId: string,
    roleId: string,
  ): BusinessMember {
    return new BusinessMember({
      businessId,
      userId,
      roleId,
      status: MemberStatus.ACTIVE,
      joinedAt: new Date(),
      permissions: [Permission.ADMIN_FULL_ACCESS],
      isOwner: true,
      metadata: { isFounder: true },
      activityHistory: [
        {
          action: 'BUSINESS_CREATED',
          timestamp: new Date(),
          details: { role: 'OWNER' },
        },
      ],
    });
  }

  public static createFromInvitation(
    businessId: string,
    userId: string,
    roleId: string,
    permissions: Permission[],
    invitedBy: string,
  ): BusinessMember {
    return new BusinessMember({
      businessId,
      userId,
      roleId,
      status: MemberStatus.PENDING,
      joinedAt: new Date(),
      invitedBy,
      permissions,
      isOwner: false,
      metadata: { source: 'invitation' },
      activityHistory: [
        {
          action: 'INVITATION_CREATED',
          timestamp: new Date(),
          details: { invitedBy },
        },
      ],
    });
  }
}
