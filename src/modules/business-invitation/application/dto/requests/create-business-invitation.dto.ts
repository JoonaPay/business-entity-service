import { ApiProperty } from "@nestjs/swagger";
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUUID,
} from "class-validator";

export class CreateBusinessInvitationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  businessId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  roleId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  invitedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  message?: string;
}