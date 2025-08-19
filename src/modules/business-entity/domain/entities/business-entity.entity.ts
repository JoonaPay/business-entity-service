import { BaseDomainEntity } from '../../../../core/domain/base-domain-entity';

export enum LegalStructure {
  SOLE_PROPRIETORSHIP = 'SOLE_PROPRIETORSHIP',
  PARTNERSHIP = 'PARTNERSHIP',
  LLC = 'LLC',
  CORPORATION = 'CORPORATION',
  S_CORPORATION = 'S_CORPORATION',
  NON_PROFIT = 'NON_PROFIT',
  OTHER = 'OTHER',
}

export enum BusinessStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
  CLOSED = 'CLOSED',
}

export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  website?: string;
}

export enum BusinessType {
  ROOT_ORGANIZATION = 'ROOT_ORGANIZATION',
  SUBSIDIARY = 'SUBSIDIARY',
  DIVISION = 'DIVISION',
  DEPARTMENT = 'DEPARTMENT',
  TEAM = 'TEAM',
}

export enum Environment {
  SANDBOX = 'SANDBOX',
  PRODUCTION = 'PRODUCTION',
}

export interface APIKey {
  id: string;
  key: string;
  name: string;
  environment: Environment;
  scopes: string[];
  isActive: boolean;
  rateLimit: number;
  lastUsedAt?: Date;
  createdAt: Date;
  expiresAt?: Date;
}

export interface EnvironmentConfig {
  apiKeys: APIKey[];
  webhookUrl?: string;
  hmacSecret?: string;
  ipAllowlist: string[];
  rateLimit: number;
  isEnabled: boolean;
}

export interface UsageMetrics {
  apiCallsToday: number;
  apiCallsMonth: number;
  lastResetDate: Date;
}

export interface BillingInfo {
  tier: 'FREE' | 'STARTUP' | 'ENTERPRISE';
  usage: UsageMetrics;
  limits: {
    apiCallsPerDay: number;
    apiCallsPerMonth: number;
    maxSubBusinesses: number;
    maxMembers: number;
  };
}

export interface ComplianceInfo {
  kycStatus: VerificationStatus;
  contractSigned: boolean;
  dataResidency: string;
  complianceDocuments: string[];
}

export interface BusinessHierarchy {
  level: number;
  path: string[];
  maxDepth: number;
  allowedChildTypes: BusinessType[];
}

export interface BusinessSettings {
  allowSubsidiaries: boolean;
  requireVerification: boolean;
  maxMembers?: number;
  notificationPreferences: Record<string, boolean>;
  autoInheritPermissions: boolean;
  cascadeStatusChanges: boolean;
  timezone?: string;
  language?: string;
}

export interface BusinessEntityProps {
  id?: string;
  name: string;
  description?: string;
  legalName: string;
  legalStructure: LegalStructure;
  businessType: BusinessType;
  taxId?: string;
  industryCode: string;
  registrationNumber?: string;
  incorporationDate?: Date;
  address: BusinessAddress;
  contactInfo: ContactInfo;
  status: BusinessStatus;
  verificationStatus: VerificationStatus;
  parentBusinessId?: string;
  rootBusinessId?: string;
  hierarchy: BusinessHierarchy;
  settings: BusinessSettings;
  environments: {
    sandbox: EnvironmentConfig;
    production: EnvironmentConfig;
  };
  billing: BillingInfo;
  compliance: ComplianceInfo;
  metadata: Record<string, any>;
  ownerId: string;
  childBusinessIds: string[];
}

export class BusinessEntity extends BaseDomainEntity {
  private readonly _name: string;
  private _description?: string;
  private readonly _legalName: string;
  private readonly _legalStructure: LegalStructure;
  private readonly _businessType: BusinessType;
  private _taxId?: string;
  private readonly _industryCode: string;
  private _registrationNumber?: string;
  private readonly _incorporationDate?: Date;
  private _address: BusinessAddress;
  private _contactInfo: ContactInfo;
  private _status: BusinessStatus;
  private _verificationStatus: VerificationStatus;
  private readonly _parentBusinessId?: string;
  private readonly _rootBusinessId?: string;
  private _hierarchy: BusinessHierarchy;
  private _settings: BusinessSettings;
  private _environments: {
    sandbox: EnvironmentConfig;
    production: EnvironmentConfig;
  };
  private _billing: BillingInfo;
  private _compliance: ComplianceInfo;
  private _metadata: Record<string, any>;
  private readonly _ownerId: string;
  private _childBusinessIds: string[];

  constructor(props: BusinessEntityProps) {
    super(props.id);

    this._name = props.name;
    this._description = props.description;
    this._legalName = props.legalName;
    this._legalStructure = props.legalStructure;
    this._businessType = props.businessType;
    this._taxId = props.taxId;
    this._industryCode = props.industryCode;
    this._registrationNumber = props.registrationNumber;
    this._incorporationDate = props.incorporationDate;
    this._address = props.address;
    this._contactInfo = props.contactInfo;
    this._status = props.status;
    this._verificationStatus = props.verificationStatus;
    this._parentBusinessId = props.parentBusinessId;
    this._rootBusinessId = props.rootBusinessId;
    this._hierarchy = props.hierarchy;
    this._settings = props.settings;
    this._environments = props.environments;
    this._billing = props.billing;
    this._compliance = props.compliance;
    this._metadata = props.metadata || {};
    this._ownerId = props.ownerId;
    this._childBusinessIds = props.childBusinessIds || [];

    this.validateBusinessRules();
  }

  get name(): string {
    return this._name;
  }

  get description(): string | undefined {
    return this._description;
  }

  get legalName(): string {
    return this._legalName;
  }

  get legalStructure(): LegalStructure {
    return this._legalStructure;
  }

  get taxId(): string | undefined {
    return this._taxId;
  }

  get industryCode(): string {
    return this._industryCode;
  }

  get registrationNumber(): string | undefined {
    return this._registrationNumber;
  }

  get incorporationDate(): Date | undefined {
    return this._incorporationDate;
  }

  get address(): BusinessAddress {
    return this._address;
  }

  get contactInfo(): ContactInfo {
    return this._contactInfo;
  }

  get status(): BusinessStatus {
    return this._status;
  }

  get verificationStatus(): VerificationStatus {
    return this._verificationStatus;
  }

  get parentBusinessId(): string | undefined {
    return this._parentBusinessId;
  }

  get settings(): BusinessSettings {
    return this._settings;
  }

  get metadata(): Record<string, any> {
    return this._metadata;
  }

  get ownerId(): string {
    return this._ownerId;
  }

  get businessType(): BusinessType {
    return this._businessType;
  }

  get rootBusinessId(): string | undefined {
    return this._rootBusinessId;
  }

  get hierarchy(): BusinessHierarchy {
    return this._hierarchy;
  }

  get environments(): {
    sandbox: EnvironmentConfig;
    production: EnvironmentConfig;
  } {
    return this._environments;
  }

  get billing(): BillingInfo {
    return this._billing;
  }

  get compliance(): ComplianceInfo {
    return this._compliance;
  }

  get childBusinessIds(): string[] {
    return this._childBusinessIds;
  }

  get tags(): string[] | undefined {
    return this._metadata?.tags;
  }

  get memberCount(): number {
    return this._metadata?.memberCount || 0;
  }

  get supportedCurrencies(): string[] | undefined {
    return this._metadata?.supportedCurrencies;
  }

  get verifiedAt(): Date | undefined {
    return this._metadata?.verifiedAt;
  }

  get suspendedAt(): Date | undefined {
    return this._metadata?.suspendedAt;
  }

  get closedAt(): Date | undefined {
    return this._metadata?.closedAt;
  }

  get suspensionReason(): string | undefined {
    return this._metadata?.suspensionReason;
  }

  get closureReason(): string | undefined {
    return this._metadata?.closureReason;
  }

  get termsAcceptedAt(): Date | undefined {
    return this._metadata?.termsAcceptedAt;
  }

  get termsVersion(): string | undefined {
    return this._metadata?.termsVersion;
  }

  public updateDescription(description: string): void {
    this._description = description;
    this.touch();
  }

  public updateAddress(address: BusinessAddress): void {
    this._address = address;
    this.touch();
  }

  public updateContactInfo(contactInfo: ContactInfo): void {
    this._contactInfo = contactInfo;
    this.touch();
  }

  public updateTaxId(taxId: string): void {
    this._taxId = taxId;
    this.touch();
  }

  public updateRegistrationNumber(registrationNumber: string): void {
    this._registrationNumber = registrationNumber;
    this.touch();
  }

  public updateSettings(settings: Partial<BusinessSettings>): void {
    this._settings = { ...this._settings, ...settings };
    this.touch();
  }

  public updateMetadata(metadata: Record<string, any>): void {
    this._metadata = { ...this._metadata, ...metadata };
    this.touch();
  }

  public activate(): void {
    if (this._status === BusinessStatus.DRAFT) {
      this._status = BusinessStatus.ACTIVE;
      this.touch();
    } else {
      throw new Error('Business can only be activated from DRAFT status');
    }
  }

  public suspend(): void {
    if (this._status === BusinessStatus.ACTIVE) {
      this._status = BusinessStatus.SUSPENDED;
      this.touch();
    } else {
      throw new Error('Only ACTIVE businesses can be suspended');
    }
  }

  public reactivate(): void {
    if (
      this._status === BusinessStatus.SUSPENDED ||
      this._status === BusinessStatus.INACTIVE
    ) {
      this._status = BusinessStatus.ACTIVE;
      this.touch();
    } else {
      throw new Error(
        'Business can only be reactivated from SUSPENDED or INACTIVE status',
      );
    }
  }

  public deactivate(): void {
    if (
      this._status === BusinessStatus.ACTIVE ||
      this._status === BusinessStatus.SUSPENDED
    ) {
      this._status = BusinessStatus.INACTIVE;
      this.touch();
    } else {
      throw new Error(
        'Business can only be deactivated from ACTIVE or SUSPENDED status',
      );
    }
  }

  public close(): void {
    if (this._status !== BusinessStatus.CLOSED) {
      this._status = BusinessStatus.CLOSED;
      this.markDeleted();
    }
  }

  public submitForVerification(): void {
    if (this._verificationStatus === VerificationStatus.UNVERIFIED) {
      this._verificationStatus = VerificationStatus.PENDING;
      this.touch();
    } else {
      throw new Error(
        'Business can only be submitted for verification from UNVERIFIED status',
      );
    }
  }

  public markAsVerified(): void {
    if (this._verificationStatus === VerificationStatus.PENDING) {
      this._verificationStatus = VerificationStatus.VERIFIED;
      this.touch();
    } else {
      throw new Error(
        'Only businesses with PENDING verification can be marked as verified',
      );
    }
  }

  public rejectVerification(): void {
    if (this._verificationStatus === VerificationStatus.PENDING) {
      this._verificationStatus = VerificationStatus.REJECTED;
      this.touch();
    } else {
      throw new Error(
        'Only businesses with PENDING verification can be rejected',
      );
    }
  }

  public resetVerification(): void {
    if (this._verificationStatus === VerificationStatus.REJECTED) {
      this._verificationStatus = VerificationStatus.UNVERIFIED;
      this.touch();
    } else {
      throw new Error('Only REJECTED verifications can be reset');
    }
  }

  public isBusinessActive(): boolean {
    return this._status === BusinessStatus.ACTIVE;
  }

  public isVerified(): boolean {
    return this._verificationStatus === VerificationStatus.VERIFIED;
  }

  public isSubsidiary(): boolean {
    return this._parentBusinessId !== undefined;
  }

  public canHaveSubsidiaries(): boolean {
    return (
      this._settings.allowSubsidiaries &&
      this._childBusinessIds.length < this._billing.limits.maxSubBusinesses
    );
  }

  public canAddMembers(): boolean {
    return true;
  }

  public isRootOrganization(): boolean {
    return this._businessType === BusinessType.ROOT_ORGANIZATION;
  }

  public getHierarchyLevel(): number {
    return this._hierarchy.level;
  }

  public getHierarchyPath(): string[] {
    return [...this._hierarchy.path];
  }

  public addChildBusiness(childBusinessId: string): void {
    if (!this.canHaveSubsidiaries()) {
      throw new Error('Business cannot have subsidiaries or limit exceeded');
    }

    if (!this._childBusinessIds.includes(childBusinessId)) {
      this._childBusinessIds.push(childBusinessId);
      this.touch();
    }
  }

  public removeChildBusiness(childBusinessId: string): void {
    const index = this._childBusinessIds.indexOf(childBusinessId);
    if (index > -1) {
      this._childBusinessIds.splice(index, 1);
      this.touch();
    }
  }

  public createAPIKey(
    environment: Environment,
    name: string,
    scopes: string[],
    rateLimit?: number,
  ): APIKey {
    if (environment === Environment.PRODUCTION && !this.isVerified()) {
      throw new Error('Production API keys require business verification');
    }

    if (
      environment === Environment.PRODUCTION &&
      !this._compliance.contractSigned
    ) {
      throw new Error('Production API keys require signed contract');
    }

    const prefix = environment === Environment.PRODUCTION ? 'live_' : 'test_';
    const apiKey: APIKey = {
      id: this.generateId(),
      key: this.generateAPIKey(prefix),
      name,
      environment,
      scopes,
      isActive: true,
      rateLimit:
        rateLimit ||
        this._environments[
          environment.toLowerCase() as 'sandbox' | 'production'
        ].rateLimit,
      createdAt: new Date(),
    };

    const envKey = environment.toLowerCase() as 'sandbox' | 'production';
    this._environments[envKey].apiKeys.push(apiKey);
    this.touch();

    return apiKey;
  }

  public revokeAPIKey(keyId: string, environment: Environment): void {
    const envKey = environment.toLowerCase() as 'sandbox' | 'production';
    const keyIndex = this._environments[envKey].apiKeys.findIndex(
      (key) => key.id === keyId,
    );

    if (keyIndex > -1) {
      this._environments[envKey].apiKeys[keyIndex].isActive = false;
      this.touch();
    }
  }

  public validateAPIKey(apiKey: string): APIKey | null {
    for (const env of ['sandbox', 'production'] as const) {
      const key = this._environments[env].apiKeys.find(
        (k) =>
          k.key === apiKey &&
          k.isActive &&
          (!k.expiresAt || k.expiresAt > new Date()),
      );
      if (key) return key;
    }
    return null;
  }

  public trackUsage(apiCallCount: number = 1): void {
    this._billing.usage.apiCallsToday += apiCallCount;
    this._billing.usage.apiCallsMonth += apiCallCount;

    if (
      this._billing.usage.apiCallsToday > this._billing.limits.apiCallsPerDay
    ) {
      throw new Error('Daily API call limit exceeded');
    }

    if (
      this._billing.usage.apiCallsMonth > this._billing.limits.apiCallsPerMonth
    ) {
      throw new Error('Monthly API call limit exceeded');
    }

    this.touch();
  }

  public resetDailyUsage(): void {
    this._billing.usage.apiCallsToday = 0;
    this._billing.usage.lastResetDate = new Date();
    this.touch();
  }

  public enableProductionEnvironment(): void {
    if (!this.isVerified()) {
      throw new Error('Business verification required for production access');
    }

    if (!this._compliance.contractSigned) {
      throw new Error('Service agreement must be signed for production access');
    }

    this._environments.production.isEnabled = true;
    this.touch();
  }

  public updateBillingTier(tier: 'FREE' | 'STARTUP' | 'ENTERPRISE'): void {
    this._billing.tier = tier;

    switch (tier) {
      case 'FREE':
        this._billing.limits = {
          apiCallsPerDay: 1000,
          apiCallsPerMonth: 10000,
          maxSubBusinesses: 1,
          maxMembers: 3,
        };
        break;
      case 'STARTUP':
        this._billing.limits = {
          apiCallsPerDay: 10000,
          apiCallsPerMonth: 100000,
          maxSubBusinesses: 5,
          maxMembers: 10,
        };
        break;
      case 'ENTERPRISE':
        this._billing.limits = {
          apiCallsPerDay: 100000,
          apiCallsPerMonth: 1000000,
          maxSubBusinesses: 50,
          maxMembers: 100,
        };
        break;
    }

    this.touch();
  }

  public updateCompliance(updates: Partial<ComplianceInfo>): void {
    this._compliance = { ...this._compliance, ...updates };
    this.touch();
  }

  public canCreateChildOfType(childType: BusinessType): boolean {
    return this._hierarchy.allowedChildTypes.includes(childType);
  }

  public cascadeStatusChange(
    newStatus: BusinessStatus,
    childBusinessIds: string[],
  ): void {
    if (!this._settings.cascadeStatusChanges) {
      return;
    }

    this._status = newStatus;
    this.touch();
  }

  private generateAPIKey(prefix: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    return `${prefix}${timestamp}${random}`;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private validateBusinessRules(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Business name is required');
    }

    if (!this._legalName || this._legalName.trim().length === 0) {
      throw new Error('Legal name is required');
    }

    if (!this._industryCode || this._industryCode.trim().length === 0) {
      throw new Error('Industry code is required');
    }

    if (!this._ownerId || this._ownerId.trim().length === 0) {
      throw new Error('Owner ID is required');
    }

    if (
      !this._address.street ||
      !this._address.city ||
      !this._address.country
    ) {
      throw new Error('Complete address is required');
    }

    if (!this._contactInfo.email) {
      throw new Error('Contact email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this._contactInfo.email)) {
      throw new Error('Valid email address is required');
    }

    if (this._parentBusinessId === this.id) {
      throw new Error('Business cannot be its own parent');
    }

    if (this._incorporationDate && this._incorporationDate > new Date()) {
      throw new Error('Incorporation date cannot be in the future');
    }

    if (
      this._hierarchy.level < 0 ||
      this._hierarchy.level > this._hierarchy.maxDepth
    ) {
      throw new Error('Invalid hierarchy level');
    }

    if (
      this._businessType === BusinessType.ROOT_ORGANIZATION &&
      this._parentBusinessId
    ) {
      throw new Error('Root organization cannot have a parent');
    }

    if (
      this._businessType !== BusinessType.ROOT_ORGANIZATION &&
      !this._parentBusinessId
    ) {
      throw new Error('Non-root business must have a parent');
    }

    if (this._hierarchy.path.length !== this._hierarchy.level + 1) {
      throw new Error('Hierarchy path length must match level + 1');
    }
  }

  public static createRootOrganization(
    name: string,
    legalName: string,
    legalStructure: LegalStructure,
    ownerId: string,
    address: BusinessAddress,
    contactInfo: ContactInfo,
    industryCode: string,
  ): BusinessEntity {
    const businessId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);

    return new BusinessEntity({
      id: businessId,
      name,
      legalName,
      legalStructure,
      businessType: BusinessType.ROOT_ORGANIZATION,
      industryCode,
      address,
      contactInfo,
      status: BusinessStatus.ACTIVE,
      verificationStatus: VerificationStatus.UNVERIFIED,
      ownerId,
      hierarchy: {
        level: 0,
        path: [businessId],
        maxDepth: 10,
        allowedChildTypes: [BusinessType.SUBSIDIARY, BusinessType.DIVISION],
      },
      settings: {
        allowSubsidiaries: true,
        requireVerification: true,
        maxMembers: 100,
        notificationPreferences: {},
        autoInheritPermissions: true,
        cascadeStatusChanges: false,
      },
      environments: {
        sandbox: {
          apiKeys: [],
          ipAllowlist: [],
          rateLimit: 100,
          isEnabled: true,
        },
        production: {
          apiKeys: [],
          ipAllowlist: [],
          rateLimit: 0,
          isEnabled: false,
        },
      },
      billing: {
        tier: 'FREE',
        usage: {
          apiCallsToday: 0,
          apiCallsMonth: 0,
          lastResetDate: new Date(),
        },
        limits: {
          apiCallsPerDay: 1000,
          apiCallsPerMonth: 10000,
          maxSubBusinesses: 1,
          maxMembers: 3,
        },
      },
      compliance: {
        kycStatus: VerificationStatus.UNVERIFIED,
        contractSigned: false,
        dataResidency: 'US',
        complianceDocuments: [],
      },
      metadata: {
        createdVia: 'web',
        isRootOrganization: true,
      },
      childBusinessIds: [],
    });
  }

  public static createSubBusiness(
    name: string,
    businessType: BusinessType,
    parentBusiness: BusinessEntity,
    ownerId: string,
  ): BusinessEntity {
    if (!parentBusiness.canCreateChildOfType(businessType)) {
      throw new Error(
        `Parent business cannot create child of type ${businessType}`,
      );
    }

    if (!parentBusiness.canHaveSubsidiaries()) {
      throw new Error('Parent business cannot have more subsidiaries');
    }

    const businessId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    const newLevel = parentBusiness.getHierarchyLevel() + 1;
    const newPath = [...parentBusiness.getHierarchyPath(), businessId];

    const allowedChildTypes = this.getAllowedChildTypes(businessType);

    return new BusinessEntity({
      id: businessId,
      name,
      legalName: name,
      legalStructure: parentBusiness.legalStructure,
      businessType,
      industryCode: parentBusiness.industryCode,
      address: parentBusiness.address,
      contactInfo: parentBusiness.contactInfo,
      status: BusinessStatus.ACTIVE,
      verificationStatus: parentBusiness._settings.autoInheritPermissions
        ? parentBusiness._verificationStatus
        : VerificationStatus.UNVERIFIED,
      parentBusinessId: parentBusiness.id,
      rootBusinessId: parentBusiness._rootBusinessId || parentBusiness.id,
      ownerId,
      hierarchy: {
        level: newLevel,
        path: newPath,
        maxDepth: parentBusiness._hierarchy.maxDepth,
        allowedChildTypes,
      },
      settings: {
        ...parentBusiness._settings,
        allowSubsidiaries: newLevel < parentBusiness._hierarchy.maxDepth - 1,
      },
      environments: {
        sandbox: {
          apiKeys: [],
          ipAllowlist: [],
          rateLimit: Math.floor(
            parentBusiness._environments.sandbox.rateLimit * 0.5,
          ),
          isEnabled: true,
        },
        production: {
          apiKeys: [],
          ipAllowlist: [],
          rateLimit: Math.floor(
            parentBusiness._environments.production.rateLimit * 0.5,
          ),
          isEnabled: parentBusiness._environments.production.isEnabled,
        },
      },
      billing: {
        ...parentBusiness._billing,
        usage: {
          apiCallsToday: 0,
          apiCallsMonth: 0,
          lastResetDate: new Date(),
        },
        limits: {
          apiCallsPerDay: Math.floor(
            parentBusiness._billing.limits.apiCallsPerDay * 0.3,
          ),
          apiCallsPerMonth: Math.floor(
            parentBusiness._billing.limits.apiCallsPerMonth * 0.3,
          ),
          maxSubBusinesses: Math.floor(
            parentBusiness._billing.limits.maxSubBusinesses * 0.5,
          ),
          maxMembers: Math.floor(
            parentBusiness._billing.limits.maxMembers * 0.5,
          ),
        },
      },
      compliance: {
        ...parentBusiness._compliance,
        kycStatus: parentBusiness._settings.autoInheritPermissions
          ? parentBusiness._compliance.kycStatus
          : VerificationStatus.UNVERIFIED,
      },
      metadata: {
        createdVia: 'sub-business',
        parentBusinessId: parentBusiness.id,
        inheritedFrom: parentBusiness.id,
      },
      childBusinessIds: [],
    });
  }

  private static getAllowedChildTypes(
    businessType: BusinessType,
  ): BusinessType[] {
    switch (businessType) {
      case BusinessType.ROOT_ORGANIZATION:
        return [BusinessType.SUBSIDIARY, BusinessType.DIVISION];
      case BusinessType.SUBSIDIARY:
        return [BusinessType.DIVISION, BusinessType.DEPARTMENT];
      case BusinessType.DIVISION:
        return [BusinessType.DEPARTMENT, BusinessType.TEAM];
      case BusinessType.DEPARTMENT:
        return [BusinessType.TEAM];
      case BusinessType.TEAM:
        return [];
      default:
        return [];
    }
  }
}
