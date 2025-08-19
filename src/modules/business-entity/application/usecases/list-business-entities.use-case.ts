import { Injectable } from '@nestjs/common';
import { BusinessEntityRepository } from '@modules/business-entity/infrastructure/repositories';

@Injectable()
export class ListBusinessEntitiesUseCase {
  constructor(private readonly repository: BusinessEntityRepository) {}

  async execute() {
    const entities = await this.repository.findAll();

    return entities.map((entity) => ({
      id: entity.id,
      name: entity.name,
      legalName: entity.legalName,
      legalStructure: entity.legalStructure,
      businessType: entity.businessType,
      status: entity.status,
      verificationStatus: entity.verificationStatus,
      industryCode: entity.industryCode,
      address: entity.address,
      contactInfo: entity.contactInfo,
      parentBusinessId: entity.parentBusinessId,
      rootBusinessId: entity.rootBusinessId,
      ownerId: entity.ownerId,
      memberCount: entity.memberCount,
      subBusinessCount: entity.childBusinessIds?.length || 0,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }));
  }
}
