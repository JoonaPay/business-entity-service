import { ApiProperty } from "@nestjs/swagger";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsObject,
} from "class-validator";

export class CreateBusinessEntityDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  legalName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  legalStructure: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  businessType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  industryCode: string;

  @ApiProperty()
  @IsObject()
  @IsDefined()
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @ApiProperty()
  @IsObject()
  @IsDefined()
  contactInfo: {
    email: string;
    phone?: string;
    website?: string;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}