import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';

@Entity('business_entities')
export class BusinessEntityOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'is_active', default: true })
  isActive?: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, name: 'legal_name' })
  legalName: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 50, name: 'legal_structure' })
  legalStructure: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'business_type',
    default: 'ROOT_ORGANIZATION',
  })
  businessType: string;

  @Column({ type: 'varchar', length: 50, default: 'DRAFT' })
  status: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'verification_status',
    default: 'UNVERIFIED',
  })
  verificationStatus: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'industry_code',
    nullable: true,
  })
  industryCode?: string;

  @Column({ type: 'varchar', length: 20, name: 'tax_id', nullable: true })
  taxId?: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'registration_number',
    nullable: true,
  })
  registrationNumber?: string;

  @Column({ type: 'date', name: 'incorporation_date', nullable: true })
  incorporationDate?: Date;

  @Column({ type: 'jsonb', nullable: true })
  address?: any;

  @Column({ type: 'jsonb', name: 'contact_info', nullable: true })
  contactInfo?: any;

  @Column({ type: 'uuid', name: 'parent_id', nullable: true })
  @Index()
  parentId?: string;

  @Column({ type: 'uuid', name: 'root_organization_id', nullable: true })
  @Index()
  rootOrganizationId?: string;

  @Column({ type: 'jsonb', nullable: true })
  environments?: any;

  @Column({ type: 'jsonb', nullable: true })
  billing?: any;

  @Column({ type: 'jsonb', nullable: true })
  compliance?: any;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: any;

  @Column({ type: 'simple-array', nullable: true })
  tags?: string[];

  @Column({ type: 'int', default: 0, name: 'api_calls_today' })
  apiCallsToday: number;

  @Column({ type: 'int', default: 0, name: 'api_calls_month' })
  apiCallsMonth: number;

  @Column({ type: 'timestamp', name: 'last_api_reset_date', nullable: true })
  lastApiResetDate?: Date;

  @Column({ type: 'int', default: 0, name: 'member_count' })
  memberCount: number;

  @Column({ type: 'int', default: 0, name: 'sub_business_count' })
  subBusinessCount: number;

  @Column({
    type: 'varchar',
    length: 3,
    name: 'default_currency',
    default: 'USD',
  })
  defaultCurrency: string;

  @Column({
    type: 'simple-array',
    name: 'supported_currencies',
    nullable: true,
  })
  supportedCurrencies?: string[];

  @Column({ type: 'varchar', length: 50, name: 'timezone', default: 'UTC' })
  timezone: string;

  @Column({ type: 'varchar', length: 10, name: 'language', default: 'en' })
  language: string;

  @Column({ type: 'timestamp', name: 'verified_at', nullable: true })
  verifiedAt?: Date;

  @Column({ type: 'timestamp', name: 'suspended_at', nullable: true })
  suspendedAt?: Date;

  @Column({ type: 'timestamp', name: 'closed_at', nullable: true })
  closedAt?: Date;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'suspension_reason',
    nullable: true,
  })
  suspensionReason?: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'closure_reason',
    nullable: true,
  })
  closureReason?: string;

  @Column({ type: 'boolean', name: 'is_test_mode', default: false })
  isTestMode: boolean;

  @Column({ type: 'boolean', name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ type: 'boolean', name: 'has_accepted_terms', default: false })
  hasAcceptedTerms: boolean;

  @Column({ type: 'timestamp', name: 'terms_accepted_at', nullable: true })
  termsAcceptedAt?: Date;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'terms_version',
    nullable: true,
  })
  termsVersion?: string;
}
