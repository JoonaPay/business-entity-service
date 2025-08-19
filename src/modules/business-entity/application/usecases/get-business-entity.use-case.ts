import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessEntityRepository } from '@modules/business-entity/infrastructure/repositories';

@Injectable()
export class GetBusinessEntityUseCase {
  constructor(private readonly repository: BusinessEntityRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException(`Business entity with ID ${id} not found`);
    }

    return {
      id: entity.id,
      name: entity.name,
      legalName: entity.legalName,
      legalStructure: entity.legalStructure,
      businessType: entity.businessType,
      status: entity.status,
      verificationStatus: entity.verificationStatus,
      industryCode: entity.industryCode,
      taxId: entity.taxId,
      registrationNumber: entity.registrationNumber,
      incorporationDate: entity.incorporationDate,
      address: entity.address,
      contactInfo: entity.contactInfo,
      parentBusinessId: entity.parentBusinessId,
      rootBusinessId: entity.rootBusinessId,
      hierarchy: entity.hierarchy,
      settings: entity.settings,
      environments: entity.environments,
      billing: entity.billing,
      compliance: entity.compliance,
      metadata: entity.metadata,
      ownerId: entity.ownerId,
      childBusinessIds: entity.childBusinessIds,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
