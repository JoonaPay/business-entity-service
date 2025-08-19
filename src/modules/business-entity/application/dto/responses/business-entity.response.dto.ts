import { ApiProperty } from '@nestjs/swagger';

export class BusinessEntitySummaryResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the business entity',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Display name of the business entity',
    example: 'Acme Corporation',
  })
  name: string;

  @ApiProperty({
    description: 'Legal name of the business entity',
    example: 'Acme Corporation LLC',
  })
  legalName: string;

  @ApiProperty({
    description: 'Legal structure of the business',
    enum: ['SOLE_PROPRIETORSHIP', 'PARTNERSHIP', 'LLC', 'CORPORATION', 'S_CORPORATION', 'NON_PROFIT', 'OTHER'],
    example: 'LLC',
  })
  legalStructure: string;

  @ApiProperty({
    description: 'Type of business entity in the hierarchy',
    enum: ['ROOT_ORGANIZATION', 'SUBSIDIARY', 'DIVISION', 'DEPARTMENT', 'TEAM'],
    example: 'ROOT_ORGANIZATION',
  })
  businessType: string;

  @ApiProperty({
    description: 'Current status of the business entity',
    enum: ['DRAFT', 'ACTIVE', 'SUSPENDED', 'INACTIVE', 'CLOSED'],
    example: 'ACTIVE',
  })
  status: string;

  @ApiProperty({
    description: 'Verification status of the business entity',
    enum: ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'],
    example: 'UNVERIFIED',
  })
  verificationStatus: string;

  @ApiProperty({
    description: 'Industry classification code',
    example: '541511',
  })
  industryCode: string;

  @ApiProperty({
    description: 'Number of members in the business',
    example: 5,
    minimum: 0,
  })
  memberCount: number;

  @ApiProperty({
    description: 'Number of sub-businesses under this entity',
    example: 2,
    minimum: 0,
  })
  subBusinessCount: number;

  @ApiProperty({
    description: 'When the business entity was created',
    example: '2024-01-15T10:30:00Z',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'When the business entity was last updated',
    example: '2024-01-20T14:45:00Z',
    format: 'date-time',
  })
  updatedAt: Date;
}

export class BusinessEntityDetailResponseDto extends BusinessEntitySummaryResponseDto {
  @ApiProperty({
    description: 'Description of the business entity',
    example: 'A leading provider of innovative technology solutions',
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: 'Tax identification number',
    example: '12-3456789',
    nullable: true,
  })
  taxId?: string;

  @ApiProperty({
    description: 'Business registration number',
    example: 'REG123456789',
    nullable: true,
  })
  registrationNumber?: string;

  @ApiProperty({
    description: 'Date of incorporation',
    example: '2020-01-15',
    format: 'date',
    nullable: true,
  })
  incorporationDate?: Date;

  @ApiProperty({
    description: 'Physical address of the business',
    example: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US'
    },
    type: 'object',
  })
  address: object;

  @ApiProperty({
    description: 'Contact information for the business',
    example: {
      email: 'contact@acme.com',
      phone: '+1-555-123-4567',
      website: 'https://acme.com'
    },
    type: 'object',
  })
  contactInfo: object;

  @ApiProperty({
    description: 'Parent business entity ID (if this is a sub-business)',
    example: '456e7890-e89b-12d3-a456-426614174001',
    format: 'uuid',
    nullable: true,
  })
  parentBusinessId?: string;

  @ApiProperty({
    description: 'Root organization ID in the business hierarchy',
    example: '789e0123-e89b-12d3-a456-426614174002',
    format: 'uuid',
    nullable: true,
  })
  rootBusinessId?: string;

  @ApiProperty({
    description: 'Business settings and preferences',
    example: {
      allowSubsidiaries: true,
      requireVerification: false,
      maxMembers: 100,
      timezone: 'UTC',
      language: 'en'
    },
    type: 'object',
  })
  settings: object;

  @ApiProperty({
    description: 'Environment configurations (sandbox/production)',
    example: {
      sandbox: {
        apiKeys: [],
        rateLimit: 100,
        isEnabled: true
      },
      production: {
        apiKeys: [],
        rateLimit: 0,
        isEnabled: false
      }
    },
    type: 'object',
  })
  environments: object;

  @ApiProperty({
    description: 'Billing information and usage limits',
    example: {
      tier: 'FREE',
      usage: {
        apiCallsToday: 45,
        apiCallsMonth: 1200,
        lastResetDate: '2024-01-20T00:00:00Z'
      },
      limits: {
        apiCallsPerDay: 1000,
        apiCallsPerMonth: 10000,
        maxSubBusinesses: 1,
        maxMembers: 3
      }
    },
    type: 'object',
  })
  billing: object;

  @ApiProperty({
    description: 'Compliance and verification information',
    example: {
      kycStatus: 'UNVERIFIED',
      contractSigned: false,
      dataResidency: 'US',
      complianceDocuments: []
    },
    type: 'object',
  })
  compliance: object;

  @ApiProperty({
    description: 'Additional metadata and custom fields',
    example: {
      createdVia: 'web',
      isRootOrganization: true
    },
    type: 'object',
  })
  metadata: object;

  @ApiProperty({
    description: 'Owner user ID',
    example: 'user_123456',
  })
  ownerId: string;

  @ApiProperty({
    description: 'List of child business entity IDs',
    example: ['sub_business_1', 'sub_business_2'],
    type: 'array',
    items: { type: 'string' },
  })
  childBusinessIds: string[];
}

export class DeleteBusinessEntityResponseDto {
  @ApiProperty({
    description: 'Indicates if the deletion was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Confirmation message',
    example: 'Business entity 123e4567-e89b-12d3-a456-426614174000 has been deleted',
  })
  message: string;
}