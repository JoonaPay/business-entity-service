import { BaseDomainEntity } from '../../../../core/domain/base-domain-entity';
import { v4 as uuidv4 } from 'uuid';
import { Permission } from '../../../business-role/domain/entities/business-role.entity';

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED'
}

export enum InvitationType {
  EMAIL = 'EMAIL',
  DIRECT = 'DIRECT',
  BULK = 'BULK'
}

export interface InvitationNotification {
  type: string;
  sentAt: Date;
  deliveryStatus: 'SENT' | 'DELIVERED' | 'FAILED';
  errorMessage?: string;
}

export interface BusinessInvitationProps {
  id?: string;
  businessId: string;
  email: string;
  roleId: string;
  status: InvitationStatus;
  invitedBy: string;
  message?: string;
  token: string;
  expiresAt: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
  cancelledAt?: Date;
  acceptedBy?: string;
  invitationType: InvitationType;
  permissions: Permission[];
  metadata: Record<string, any>;
  notifications: InvitationNotification[];
  resendCount: number;
  lastResendAt?: Date;
}

export class BusinessInvitation extends BaseDomainEntity {
  private readonly _businessId: string;
  private readonly _email: string;
  private _roleId: string;
  private _status: InvitationStatus;
  private readonly _invitedBy: string;
  private _message?: string;
  private readonly _token: string;
  private _expiresAt: Date;
  private _acceptedAt?: Date;
  private _rejectedAt?: Date;
  private _cancelledAt?: Date;
  private _acceptedBy?: string;
  private readonly _invitationType: InvitationType;
  private _permissions: Permission[];
  private _metadata: Record<string, any>;
  private _notifications: InvitationNotification[];
  private _resendCount: number;
  private _lastResendAt?: Date;

  constructor(props: BusinessInvitationProps) {
    super(props.id);
    
    this._businessId = props.businessId;
    this._email = props.email.toLowerCase().trim();
    this._roleId = props.roleId;
    this._status = props.status;
    this._invitedBy = props.invitedBy;
    this._message = props.message;
    this._token = props.token;
    this._expiresAt = props.expiresAt;
    this._acceptedAt = props.acceptedAt;
    this._rejectedAt = props.rejectedAt;
    this._cancelledAt = props.cancelledAt;
    this._acceptedBy = props.acceptedBy;
    this._invitationType = props.invitationType;
    this._permissions = [...props.permissions];
    this._metadata = props.metadata || {};
    this._notifications = props.notifications || [];
    this._resendCount = props.resendCount || 0;
    this._lastResendAt = props.lastResendAt;

    this.validateBusinessRules();
  }

  get businessId(): string {
    return this._businessId;
  }

  get email(): string {
    return this._email;
  }

  get roleId(): string {
    return this._roleId;
  }

  get status(): InvitationStatus {
    return this._status;
  }

  get invitedBy(): string {
    return this._invitedBy;
  }

  get message(): string | undefined {
    return this._message;
  }

  get token(): string {
    return this._token;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  get acceptedAt(): Date | undefined {
    return this._acceptedAt;
  }

  get rejectedAt(): Date | undefined {
    return this._rejectedAt;
  }

  get cancelledAt(): Date | undefined {
    return this._cancelledAt;
  }

  get acceptedBy(): string | undefined {
    return this._acceptedBy;
  }

  get invitationType(): InvitationType {
    return this._invitationType;
  }

  get permissions(): Permission[] {
    return [...this._permissions];
  }

  get metadata(): Record<string, any> {
    return this._metadata;
  }

  get notifications(): InvitationNotification[] {
    return [...this._notifications];
  }

  get resendCount(): number {
    return this._resendCount;
  }

  get lastResendAt(): Date | undefined {
    return this._lastResendAt;
  }

  public updateRole(roleId: string, permissions: Permission[]): void {
    if (this._status !== InvitationStatus.PENDING) {
      throw new Error('Can only update role for pending invitations');
    }
    
    this._roleId = roleId;
    this._permissions = [...permissions];
    this.touch();
  }

  public updateMessage(message: string): void {
    if (this._status !== InvitationStatus.PENDING) {
      throw new Error('Can only update message for pending invitations');
    }
    
    this._message = message;
    this.touch();
  }

  public extendExpiration(newExpirationDate: Date): void {
    if (this._status !== InvitationStatus.PENDING) {
      throw new Error('Can only extend expiration for pending invitations');
    }
    
    if (newExpirationDate <= new Date()) {
      throw new Error('New expiration date must be in the future');
    }
    
    if (newExpirationDate <= this._expiresAt) {
      throw new Error('New expiration date must be later than current expiration');
    }
    
    this._expiresAt = newExpirationDate;
    this.touch();
  }

  public accept(acceptedBy?: string): void {
    if (this._status !== InvitationStatus.PENDING) {
      throw new Error('Only pending invitations can be accepted');
    }
    
    if (this.isExpired()) {
      throw new Error('Cannot accept expired invitation');
    }
    
    this._status = InvitationStatus.ACCEPTED;
    this._acceptedAt = new Date();
    this._acceptedBy = acceptedBy;
    this.touch();
  }

  public reject(): void {
    if (this._status !== InvitationStatus.PENDING) {
      throw new Error('Only pending invitations can be rejected');
    }
    
    this._status = InvitationStatus.REJECTED;
    this._rejectedAt = new Date();
    this.touch();
  }

  public cancel(): void {
    if (this._status !== InvitationStatus.PENDING) {
      throw new Error('Only pending invitations can be cancelled');
    }
    
    this._status = InvitationStatus.CANCELLED;
    this._cancelledAt = new Date();
    this.touch();
  }

  public markAsExpired(): void {
    if (this._status === InvitationStatus.PENDING && this.isExpired()) {
      this._status = InvitationStatus.EXPIRED;
      this.touch();
    }
  }

  public resend(newExpirationDate?: Date): void {
    if (this._status !== InvitationStatus.PENDING) {
      throw new Error('Can only resend pending invitations');
    }
    
    if (this._resendCount >= 5) {
      throw new Error('Maximum resend limit (5) reached');
    }
    
    const now = new Date();
    if (this._lastResendAt && (now.getTime() - this._lastResendAt.getTime()) < 60000) {
      throw new Error('Must wait at least 1 minute between resends');
    }
    
    this._resendCount++;
    this._lastResendAt = now;
    
    if (newExpirationDate) {
      this._expiresAt = newExpirationDate;
    }
    
    this.touch();
  }

  public addNotification(notification: InvitationNotification): void {
    this._notifications.push(notification);
    
    if (this._notifications.length > 50) {
      this._notifications = this._notifications.slice(-50);
    }
    
    this.touch();
  }

  public updateMetadata(metadata: Record<string, any>): void {
    this._metadata = { ...this._metadata, ...metadata };
    this.touch();
  }

  public isExpired(): boolean {
    return new Date() > this._expiresAt;
  }

  public isPending(): boolean {
    return this._status === InvitationStatus.PENDING;
  }

  public isAccepted(): boolean {
    return this._status === InvitationStatus.ACCEPTED;
  }

  public isRejected(): boolean {
    return this._status === InvitationStatus.REJECTED;
  }

  public isCancelled(): boolean {
    return this._status === InvitationStatus.CANCELLED;
  }

  public canBeResent(): boolean {
    return this._status === InvitationStatus.PENDING && 
           this._resendCount < 5 && 
           !this.isExpired();
  }

  public getExpirationStatus(): 'VALID' | 'EXPIRING_SOON' | 'EXPIRED' {
    if (this.isExpired()) {
      return 'EXPIRED';
    }
    
    const now = new Date();
    const timeDiff = this._expiresAt.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    if (hoursDiff <= 24) {
      return 'EXPIRING_SOON';
    }
    
    return 'VALID';
  }

  public getDaysUntilExpiration(): number {
    if (this.isExpired()) {
      return 0;
    }
    
    const now = new Date();
    const timeDiff = this._expiresAt.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  public getLastNotificationStatus(): 'SENT' | 'DELIVERED' | 'FAILED' | 'NONE' {
    if (this._notifications.length === 0) {
      return 'NONE';
    }
    
    const lastNotification = this._notifications[this._notifications.length - 1];
    return lastNotification.deliveryStatus;
  }

  private validateBusinessRules(): void {
    if (!this._businessId || this._businessId.trim().length === 0) {
      throw new Error('Business ID is required');
    }

    if (!this._email || this._email.trim().length === 0) {
      throw new Error('Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this._email)) {
      throw new Error('Valid email address is required');
    }

    if (!this._roleId || this._roleId.trim().length === 0) {
      throw new Error('Role ID is required');
    }

    if (!this._invitedBy || this._invitedBy.trim().length === 0) {
      throw new Error('Invited by user ID is required');
    }

    if (!this._token || this._token.trim().length === 0) {
      throw new Error('Invitation token is required');
    }

    if (!this._expiresAt || this._expiresAt <= this.createdAt) {
      throw new Error('Expiration date must be after creation date');
    }

    if (!this._permissions || this._permissions.length === 0) {
      throw new Error('Invitation must include at least one permission');
    }

    if (this._resendCount < 0) {
      throw new Error('Resend count cannot be negative');
    }

    if (this._resendCount > 5) {
      throw new Error('Resend count cannot exceed 5');
    }

    if (this._acceptedAt && this._acceptedAt <= this.createdAt) {
      throw new Error('Acceptance date must be after creation date');
    }

    if (this._rejectedAt && this._rejectedAt <= this.createdAt) {
      throw new Error('Rejection date must be after creation date');
    }

    if (this._cancelledAt && this._cancelledAt <= this.createdAt) {
      throw new Error('Cancellation date must be after creation date');
    }

    const uniquePermissions = new Set(this._permissions);
    if (uniquePermissions.size !== this._permissions.length) {
      throw new Error('Duplicate permissions are not allowed');
    }
  }

  public static create(
    businessId: string,
    email: string,
    roleId: string,
    invitedBy: string,
    permissions: Permission[],
    message?: string,
    expirationDays: number = 7,
    invitationType: InvitationType = InvitationType.EMAIL
  ): BusinessInvitation {
    const token = uuidv4() + '-' + Date.now().toString(36);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    return new BusinessInvitation({
      businessId,
      email,
      roleId,
      status: InvitationStatus.PENDING,
      invitedBy,
      message,
      token,
      expiresAt,
      invitationType,
      permissions,
      metadata: {
        createdVia: invitationType,
        expirationDays
      },
      notifications: [],
      resendCount: 0
    });
  }

  public static createBulkInvitation(
    businessId: string,
    email: string,
    roleId: string,
    invitedBy: string,
    permissions: Permission[],
    batchId: string,
    expirationDays: number = 7
  ): BusinessInvitation {
    const invitation = BusinessInvitation.create(
      businessId,
      email,
      roleId,
      invitedBy,
      permissions,
      undefined,
      expirationDays,
      InvitationType.BULK
    );

    invitation._metadata.batchId = batchId;
    invitation._metadata.bulkInvitation = true;

    return invitation;
  }
}