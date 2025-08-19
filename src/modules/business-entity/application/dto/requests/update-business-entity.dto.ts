import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject } from 'class-validator';

export class UpdateBusinessEntityDto {
  @ApiProperty({
    description: 'Updated description of the business entity',
    example: 'An updated description of our innovative technology solutions',
    required: false,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Updated tax identification number',
    example: '12-3456789',
    required: false,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  taxId?: string;

  @ApiProperty({
    description: 'Updated business registration number',
    example: 'REG123456789',
    required: false,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiProperty({
    description: 'Updated physical address of the business',
    example: {
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'US'
    },
    type: 'object',
    required: false,
  })
  @IsOptional()
  @IsObject()
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @ApiProperty({
    description: 'Updated contact information for the business',
    example: {
      email: 'newcontact@acme.com',
      phone: '+1-555-987-6543',
      website: 'https://newacme.com'
    },
    type: 'object',
    required: false,
  })
  @IsOptional()
  @IsObject()
  contactInfo?: {
    email: string;
    phone?: string;
    website?: string;
  };

  @ApiProperty({
    description: 'Updated business settings and preferences',
    example: {
      allowSubsidiaries: true,
      requireVerification: false,
      maxMembers: 50,
      timezone: 'America/New_York',
      language: 'en'
    },
    type: 'object',
    required: false,
  })
  @IsOptional()
  @IsObject()
  settings?: any;
}