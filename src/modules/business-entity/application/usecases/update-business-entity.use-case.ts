import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessEntityRepository } from '@modules/business-entity/infrastructure/repositories';

export interface UpdateBusinessEntityCommand {
  id: string;
  description?: string;
  taxId?: string;
  registrationNumber?: string;
  address?: any;
  contactInfo?: any;
  settings?: any;
  metadata?: any;
}

@Injectable()
export class UpdateBusinessEntityUseCase {
  constructor(private readonly repository: BusinessEntityRepository) {}

  async execute(command: UpdateBusinessEntityCommand) {
    const entity = await this.repository.findById(command.id);

    if (!entity) {
      throw new NotFoundException(
        `Business entity with ID ${command.id} not found`,
      );
    }

    if (command.description !== undefined) {
      entity.updateDescription(command.description);
    }

    if (command.taxId !== undefined) {
      entity.updateTaxId(command.taxId);
    }

    if (command.registrationNumber !== undefined) {
      entity.updateRegistrationNumber(command.registrationNumber);
    }

    if (command.address) {
      entity.updateAddress(command.address);
    }

    if (command.contactInfo) {
      entity.updateContactInfo(command.contactInfo);
    }

    if (command.settings) {
      entity.updateSettings(command.settings);
    }

    if (command.metadata) {
      entity.updateMetadata(command.metadata);
    }

    const updatedEntity = await this.repository.update(command.id, entity);

    return {
      id: updatedEntity.id,
      name: updatedEntity.name,
      legalName: updatedEntity.legalName,
      legalStructure: updatedEntity.legalStructure,
      businessType: updatedEntity.businessType,
      status: updatedEntity.status,
      verificationStatus: updatedEntity.verificationStatus,
      industryCode: updatedEntity.industryCode,
      taxId: updatedEntity.taxId,
      registrationNumber: updatedEntity.registrationNumber,
      incorporationDate: updatedEntity.incorporationDate,
      address: updatedEntity.address,
      contactInfo: updatedEntity.contactInfo,
      settings: updatedEntity.settings,
      metadata: updatedEntity.metadata,
      ownerId: updatedEntity.ownerId,
      createdAt: updatedEntity.createdAt,
      updatedAt: updatedEntity.updatedAt,
    };
  }
}
