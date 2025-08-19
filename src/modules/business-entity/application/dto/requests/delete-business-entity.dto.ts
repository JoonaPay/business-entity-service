import { ApiProperty } from "@nestjs/swagger";
import {
  IsDefined,
  IsString,
  IsUUID,
} from "class-validator";

export class DeleteBusinessEntityDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsDefined()
  id: string;
}