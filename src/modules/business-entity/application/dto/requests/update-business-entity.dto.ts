import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsObject,
} from "class-validator";

export class UpdateBusinessEntityDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  contactInfo?: {
    email: string;
    phone?: string;
    website?: string;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  settings?: any;
}