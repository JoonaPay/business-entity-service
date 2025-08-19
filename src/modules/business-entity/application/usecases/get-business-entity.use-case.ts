import { Injectable, NotFoundException } from "@nestjs/common";
import { BusinessEntity } from "@modules/business-entity/domain/entities";
import { BusinessEntityRepository } from "@modules/business-entity/infrastructure/repositories";

@Injectable()
export class GetBusinessEntityUseCase {
  constructor(private readonly repository: BusinessEntityRepository) {}

  async execute(id: string): Promise<BusinessEntity> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException(`Business entity with id ${id} not found`);
    }
    return entity;
  }
}