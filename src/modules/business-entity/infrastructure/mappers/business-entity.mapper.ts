import { BusinessEntityOrmEntity } from '@modules/business-entity/infrastructure/orm-entities';
import {
  BusinessEntity,
  BusinessEntityProps,
  LegalStructure,
  BusinessStatus,
  VerificationStatus,
  BusinessType,
  Environment,
} from '@modules/business-entity/domain/entities';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BusinessEntityMapper {
  toOrmEntity(domainEntity: BusinessEntity): BusinessEntityOrmEntity {
    if (!domainEntity) {
      throw new Error('Domain entity is required');
    }

    const ormEntity = new BusinessEntityOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.legalName = domainEntity.legalName;
    ormEntity.description = domainEntity.description;
    ormEntity.legalStructure = domainEntity.legalStructure;
    ormEntity.businessType = domainEntity.businessType;
    ormEntity.status = domainEntity.status;
    ormEntity.verificationStatus = domainEntity.verificationStatus;
    ormEntity.industryCode = domainEntity.industryCode;
    ormEntity.taxId = domainEntity.taxId;
    ormEntity.registrationNumber = domainEntity.registrationNumber;
    ormEntity.incorporationDate = domainEntity.incorporationDate;
    ormEntity.address = domainEntity.address;
    ormEntity.contactInfo = domainEntity.contactInfo;
    ormEntity.parentId = domainEntity.parentBusinessId;
    ormEntity.rootOrganizationId = domainEntity.rootBusinessId;
    ormEntity.environments = domainEntity.environments;
    ormEntity.billing = domainEntity.billing;
    ormEntity.compliance = domainEntity.compliance;
    ormEntity.metadata = domainEntity.metadata;
    ormEntity.tags = domainEntity.tags;
    ormEntity.memberCount = domainEntity.memberCount || 0;
    ormEntity.subBusinessCount = domainEntity.childBusinessIds?.length || 0;
    ormEntity.defaultCurrency = domainEntity.billing?.usage ? 'USD' : 'USD';
    ormEntity.supportedCurrencies = domainEntity.supportedCurrencies || ['USD'];
    ormEntity.timezone = domainEntity.settings?.timezone || 'UTC';
    ormEntity.language = domainEntity.settings?.language || 'en';
    ormEntity.verifiedAt = domainEntity.verifiedAt;
    ormEntity.suspendedAt = domainEntity.suspendedAt;
    ormEntity.closedAt = domainEntity.closedAt;
    ormEntity.suspensionReason = domainEntity.suspensionReason;
    ormEntity.closureReason = domainEntity.closureReason;
    ormEntity.isTestMode =
      domainEntity.environments?.sandbox?.isEnabled || false;
    ormEntity.isVerified =
      domainEntity.verificationStatus === VerificationStatus.VERIFIED;
    ormEntity.hasAcceptedTerms =
      domainEntity.compliance?.contractSigned || false;
    ormEntity.termsAcceptedAt = domainEntity.termsAcceptedAt;
    ormEntity.termsVersion = domainEntity.termsVersion;
    ormEntity.apiCallsToday = domainEntity.billing?.usage?.apiCallsToday || 0;
    ormEntity.apiCallsMonth = domainEntity.billing?.usage?.apiCallsMonth || 0;
    ormEntity.lastApiResetDate = domainEntity.billing?.usage?.lastResetDate;
    ormEntity.isActive = domainEntity.isActive();
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    ormEntity.deletedAt = domainEntity.deletedAt;

    return ormEntity;
  }

  toDomainEntity(ormEntity: BusinessEntityOrmEntity): BusinessEntity {
    if (!ormEntity) {
      throw new Error('ORM entity is required');
    }

    const props: BusinessEntityProps = {
      id: ormEntity.id,
      name: ormEntity.name,
      description: ormEntity.description,
      legalName: ormEntity.legalName,
      legalStructure: ormEntity.legalStructure as LegalStructure,
      businessType:
        (ormEntity.businessType as BusinessType) ||
        BusinessType.ROOT_ORGANIZATION,
      taxId: ormEntity.taxId,
      industryCode: ormEntity.industryCode,
      registrationNumber: ormEntity.registrationNumber,
      incorporationDate: ormEntity.incorporationDate,
      address: ormEntity.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },
      contactInfo: ormEntity.contactInfo || {
        email: '',
        phone: '',
        website: '',
      },
      status: (ormEntity.status as BusinessStatus) || BusinessStatus.DRAFT,
      verificationStatus:
        (ormEntity.verificationStatus as VerificationStatus) ||
        VerificationStatus.UNVERIFIED,
      parentBusinessId: ormEntity.parentId,
      rootBusinessId: ormEntity.rootOrganizationId,
      hierarchy: {
        level: ormEntity.parentId ? 1 : 0,
        path: [],
        maxDepth: 5,
        allowedChildTypes: this.getAllowedChildTypes(
          ormEntity.businessType as BusinessType,
        ),
      },
      settings: {
        allowSubsidiaries: true,
        requireVerification: false,
        maxMembers: 100,
        notificationPreferences: {},
        autoInheritPermissions: false,
        cascadeStatusChanges: false,
        timezone: ormEntity.timezone,
        language: ormEntity.language,
      },
      environments: ormEntity.environments || {
        sandbox: this.createDefaultEnvironmentConfig(Environment.SANDBOX),
        production: this.createDefaultEnvironmentConfig(Environment.PRODUCTION),
      },
      billing: ormEntity.billing || {
        tier: 'FREE',
        usage: {
          apiCallsToday: ormEntity.apiCallsToday || 0,
          apiCallsMonth: ormEntity.apiCallsMonth || 0,
          lastResetDate: ormEntity.lastApiResetDate || new Date(),
        },
        limits: {
          apiCallsPerDay: 1000,
          apiCallsPerMonth: 10000,
          maxSubBusinesses: 5,
          maxMembers: 10,
        },
      },
      compliance: ormEntity.compliance || {
        kycStatus: VerificationStatus.UNVERIFIED,
        contractSigned: ormEntity.hasAcceptedTerms || false,
        dataResidency: 'US',
        complianceDocuments: [],
      },
      metadata: ormEntity.metadata || {},
      ownerId: '',
      childBusinessIds: [],
    };

    const entity = new BusinessEntity(props);

    return entity;
  }

  private getAllowedChildTypes(businessType: BusinessType): BusinessType[] {
    switch (businessType) {
      case BusinessType.ROOT_ORGANIZATION:
        return [
          BusinessType.SUBSIDIARY,
          BusinessType.DIVISION,
          BusinessType.DEPARTMENT,
        ];
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

  private createDefaultEnvironmentConfig(environment: Environment) {
    return {
      apiKeys: [],
      webhookUrl: undefined,
      hmacSecret: undefined,
      ipAllowlist: [],
      rateLimit: 100,
      isEnabled: environment === Environment.SANDBOX,
    };
  }
}
