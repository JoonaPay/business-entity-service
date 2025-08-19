import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsObject,
  IsEmail,
  IsIn,
} from 'class-validator';

export class CreateBusinessEntityDto {
  @ApiProperty({
    description: 'The display name of the business entity',
    example: 'Acme Corporation',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({
    description: 'The legal name of the business entity as registered',
    example: 'Acme Corporation LLC',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  legalName: string;

  @ApiProperty({
    description: 'The legal structure of the business',
    enum: ['SOLE_PROPRIETORSHIP', 'PARTNERSHIP', 'LLC', 'CORPORATION', 'S_CORPORATION', 'NON_PROFIT', 'OTHER'],
    example: 'LLC',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsIn(['SOLE_PROPRIETORSHIP', 'PARTNERSHIP', 'LLC', 'CORPORATION', 'S_CORPORATION', 'NON_PROFIT', 'OTHER'])
  legalStructure: string;

  @ApiProperty({
    description: 'The type of business entity',
    enum: ['ROOT_ORGANIZATION', 'SUBSIDIARY', 'DIVISION', 'DEPARTMENT', 'TEAM'],
    example: 'ROOT_ORGANIZATION',
    default: 'ROOT_ORGANIZATION',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsIn(['ROOT_ORGANIZATION', 'SUBSIDIARY', 'DIVISION', 'DEPARTMENT', 'TEAM'])
  businessType: string;

  @ApiProperty({
    description: 'Industry classification code (NAICS or similar)',
    example: '541511',
    minLength: 2,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  industryCode: string;

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
  @IsObject()
  @IsDefined()
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @ApiProperty({
    description: 'Contact information for the business',
    example: {
      email: 'contact@acme.com',
      phone: '+1-555-123-4567',
      website: 'https://acme.com'
    },
    type: 'object',
  })
  @IsObject()
  @IsDefined()
  contactInfo: {
    email: string;
    phone?: string;
    website?: string;
  };

  @ApiProperty({
    description: 'Optional description of the business entity',
    example: 'A leading provider of innovative technology solutions',
    required: false,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  description?: string;
}