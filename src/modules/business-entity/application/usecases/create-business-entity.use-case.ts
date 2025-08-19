import { BusinessEntity } from "@modules/business-entity/domain/entities";
import { Injectable } from "@nestjs/common";

export interface CreateBusinessEntityCommand {
  name: string;
  description?: string;
  legalName: string;
  legalStructure: string;
  businessType: string;
  industryCode: string;
  address: any;
  contactInfo: any;
  ownerId: string;
}

@Injectable()
export class CreateBusinessEntityUseCase {
  async execute(command: CreateBusinessEntityCommand) {
    // Implementation will be added when repository is properly configured
    return { success: true, message: "Business entity creation use case executed" };
  }
}