import { BaseDomainEntity } from '../../../../core/domain/base-domain-entity';

export enum Permission {
  // Business Management
  BUSINESS_READ = 'BUSINESS_READ',
  BUSINESS_UPDATE = 'BUSINESS_UPDATE',
  BUSINESS_DELETE = 'BUSINESS_DELETE',
  BUSINESS_SETTINGS = 'BUSINESS_SETTINGS',
  
  // Member Management
  MEMBER_INVITE = 'MEMBER_INVITE',
  MEMBER_MANAGE = 'MEMBER_MANAGE',
  MEMBER_REMOVE = 'MEMBER_REMOVE',
  MEMBER_VIEW = 'MEMBER_VIEW',
  
  // Role Management
  ROLE_CREATE = 'ROLE_CREATE',
  ROLE_UPDATE = 'ROLE_UPDATE',
  ROLE_DELETE = 'ROLE_DELETE',
  ROLE_ASSIGN = 'ROLE_ASSIGN',
  
  // Financial Operations
  FINANCIAL_READ = 'FINANCIAL_READ',
  FINANCIAL_WRITE = 'FINANCIAL_WRITE',
  FINANCIAL_APPROVE = 'FINANCIAL_APPROVE',
  
  // Compliance and Reporting
  COMPLIANCE_READ = 'COMPLIANCE_READ',
  COMPLIANCE_MANAGE = 'COMPLIANCE_MANAGE',
  REPORTS_VIEW = 'REPORTS_VIEW',
  REPORTS_EXPORT = 'REPORTS_EXPORT',
  
  // Administrative
  ADMIN_FULL_ACCESS = 'ADMIN_FULL_ACCESS',
  AUDIT_VIEW = 'AUDIT_VIEW',
  SETTINGS_MANAGE = 'SETTINGS_MANAGE'
}

export enum SystemRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER'
}

export interface BusinessRoleProps {
  id?: string;
  businessId?: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean;
  isCustomizable: boolean;
  hierarchy: number;
  metadata: Record<string, any>;
}

export class BusinessRole extends BaseDomainEntity {
  private readonly _businessId?: string;
  private _name: string;
  private _description: string;
  private _permissions: Permission[];
  private readonly _isSystemRole: boolean;
  private _isCustomizable: boolean;
  private readonly _hierarchy: number;
  private _metadata: Record<string, any>;

  constructor(props: BusinessRoleProps) {
    super(props.id);
    
    this._businessId = props.businessId;
    this._name = props.name;
    this._description = props.description;
    this._permissions = [...props.permissions];
    this._isSystemRole = props.isSystemRole;
    this._isCustomizable = props.isCustomizable;
    this._hierarchy = props.hierarchy;
    this._metadata = props.metadata || {};

    this.validateBusinessRules();
  }

  get businessId(): string | undefined {
    return this._businessId;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get permissions(): Permission[] {
    return [...this._permissions];
  }

  get isSystemRole(): boolean {
    return this._isSystemRole;
  }

  get isCustomizable(): boolean {
    return this._isCustomizable;
  }

  get hierarchy(): number {
    return this._hierarchy;
  }

  get metadata(): Record<string, any> {
    return this._metadata;
  }

  public updateName(name: string): void {
    if (!this._isCustomizable) {
      throw new Error('System roles cannot be renamed');
    }
    
    if (!name || name.trim().length === 0) {
      throw new Error('Role name is required');
    }
    
    this._name = name.trim();
    this.touch();
  }

  public updateDescription(description: string): void {
    if (!this._isCustomizable) {
      throw new Error('System roles cannot have description updated');
    }
    
    this._description = description;
    this.touch();
  }

  public addPermission(permission: Permission): void {
    if (!this._isCustomizable) {
      throw new Error('System role permissions cannot be modified');
    }
    
    if (!this._permissions.includes(permission)) {
      this._permissions.push(permission);
      this.touch();
    }
  }

  public removePermission(permission: Permission): void {
    if (!this._isCustomizable) {
      throw new Error('System role permissions cannot be modified');
    }
    
    const index = this._permissions.indexOf(permission);
    if (index > -1) {
      this._permissions.splice(index, 1);
      this.touch();
    }
  }

  public setPermissions(permissions: Permission[]): void {
    if (!this._isCustomizable) {
      throw new Error('System role permissions cannot be modified');
    }
    
    this._permissions = [...permissions];
    this.touch();
  }

  public hasPermission(permission: Permission): boolean {
    return this._permissions.includes(permission) || 
           this._permissions.includes(Permission.ADMIN_FULL_ACCESS);
  }

  public hasAllPermissions(permissions: Permission[]): boolean {
    if (this._permissions.includes(Permission.ADMIN_FULL_ACCESS)) {
      return true;
    }
    
    return permissions.every(permission => this._permissions.includes(permission));
  }

  public hasAnyPermission(permissions: Permission[]): boolean {
    if (this._permissions.includes(Permission.ADMIN_FULL_ACCESS)) {
      return true;
    }
    
    return permissions.some(permission => this._permissions.includes(permission));
  }

  public updateMetadata(metadata: Record<string, any>): void {
    this._metadata = { ...this._metadata, ...metadata };
    this.touch();
  }

  public canManageRole(targetRole: BusinessRole): boolean {
    if (!this.hasPermission(Permission.ROLE_ASSIGN)) {
      return false;
    }
    
    return this._hierarchy <= targetRole._hierarchy;
  }

  public isHigherThan(role: BusinessRole): boolean {
    return this._hierarchy < role._hierarchy;
  }

  public isOwnerRole(): boolean {
    return this._name === SystemRole.OWNER;
  }

  public isAdminRole(): boolean {
    return this._name === SystemRole.ADMIN || this.hasPermission(Permission.ADMIN_FULL_ACCESS);
  }

  private validateBusinessRules(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Role name is required');
    }

    if (this._hierarchy < 0) {
      throw new Error('Role hierarchy must be non-negative');
    }

    if (!this._permissions || this._permissions.length === 0) {
      throw new Error('Role must have at least one permission');
    }

    if (this._isSystemRole && this._businessId) {
      throw new Error('System roles cannot be associated with a specific business');
    }

    if (!this._isSystemRole && !this._businessId) {
      throw new Error('Custom roles must be associated with a business');
    }

    const uniquePermissions = new Set(this._permissions);
    if (uniquePermissions.size !== this._permissions.length) {
      throw new Error('Duplicate permissions are not allowed');
    }

    if (this._name === SystemRole.OWNER) {
      if (this._hierarchy !== 0) {
        throw new Error('Owner role must have hierarchy level 0');
      }
      if (!this._permissions.includes(Permission.ADMIN_FULL_ACCESS)) {
        throw new Error('Owner role must have full admin access');
      }
    }
  }

  public static createSystemRole(
    name: SystemRole, 
    description: string, 
    permissions: Permission[], 
    hierarchy: number
  ): BusinessRole {
    return new BusinessRole({
      name,
      description,
      permissions,
      isSystemRole: true,
      isCustomizable: false,
      hierarchy,
      metadata: { systemRole: true }
    });
  }

  public static createOwnerRole(): BusinessRole {
    return BusinessRole.createSystemRole(
      SystemRole.OWNER,
      'Business Owner with full administrative privileges',
      [Permission.ADMIN_FULL_ACCESS],
      0
    );
  }

  public static createAdminRole(): BusinessRole {
    return BusinessRole.createSystemRole(
      SystemRole.ADMIN,
      'Administrator with comprehensive management capabilities',
      [
        Permission.BUSINESS_READ,
        Permission.BUSINESS_UPDATE,
        Permission.BUSINESS_SETTINGS,
        Permission.MEMBER_INVITE,
        Permission.MEMBER_MANAGE,
        Permission.MEMBER_REMOVE,
        Permission.MEMBER_VIEW,
        Permission.ROLE_CREATE,
        Permission.ROLE_UPDATE,
        Permission.ROLE_DELETE,
        Permission.ROLE_ASSIGN,
        Permission.FINANCIAL_READ,
        Permission.FINANCIAL_WRITE,
        Permission.COMPLIANCE_READ,
        Permission.COMPLIANCE_MANAGE,
        Permission.REPORTS_VIEW,
        Permission.REPORTS_EXPORT,
        Permission.AUDIT_VIEW,
        Permission.SETTINGS_MANAGE
      ],
      1
    );
  }

  public static createManagerRole(): BusinessRole {
    return BusinessRole.createSystemRole(
      SystemRole.MANAGER,
      'Manager with operational oversight capabilities',
      [
        Permission.BUSINESS_READ,
        Permission.MEMBER_INVITE,
        Permission.MEMBER_VIEW,
        Permission.ROLE_ASSIGN,
        Permission.FINANCIAL_READ,
        Permission.FINANCIAL_WRITE,
        Permission.COMPLIANCE_READ,
        Permission.REPORTS_VIEW,
        Permission.REPORTS_EXPORT
      ],
      2
    );
  }

  public static createMemberRole(): BusinessRole {
    return BusinessRole.createSystemRole(
      SystemRole.MEMBER,
      'Standard member with basic operational access',
      [
        Permission.BUSINESS_READ,
        Permission.MEMBER_VIEW,
        Permission.FINANCIAL_READ,
        Permission.REPORTS_VIEW
      ],
      3
    );
  }

  public static createViewerRole(): BusinessRole {
    return BusinessRole.createSystemRole(
      SystemRole.VIEWER,
      'Read-only access to business information',
      [
        Permission.BUSINESS_READ,
        Permission.MEMBER_VIEW,
        Permission.REPORTS_VIEW
      ],
      4
    );
  }
}