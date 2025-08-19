import {
  BusinessEntity,
  LegalStructure,
} from '@modules/business-entity/domain/entities';
import { Injectable } from '@nestjs/common';
import { BusinessEntityRepository } from '@modules/business-entity/infrastructure/repositories';

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
  constructor(private readonly repository: BusinessEntityRepository) {}

  async execute(command: CreateBusinessEntityCommand) {
    const entity = BusinessEntity.createRootOrganization(
      command.name,
      command.legalName,
      command.legalStructure as LegalStructure,
      command.ownerId,
      command.address,
      command.contactInfo,
      command.industryCode,
    );

    if (command.description) {
      entity.updateDescription(command.description);
    }

    const savedEntity = await this.repository.create(entity);

    return {
      id: savedEntity.id,
      name: savedEntity.name,
      legalName: savedEntity.legalName,
      legalStructure: savedEntity.legalStructure,
      businessType: savedEntity.businessType,
      status: savedEntity.status,
      verificationStatus: savedEntity.verificationStatus,
      industryCode: savedEntity.industryCode,
      address: savedEntity.address,
      contactInfo: savedEntity.contactInfo,
      ownerId: savedEntity.ownerId,
      createdAt: savedEntity.createdAt,
      updatedAt: savedEntity.updatedAt,
    };
  }
}
