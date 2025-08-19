import { Injectable } from "@nestjs/common";
import { BusinessEntity } from "@modules/business-entity/domain/entities";
import { BusinessEntityRepository } from "@modules/business-entity/infrastructure/repositories";

@Injectable()
export class ListBusinessEntitiesUseCase {
  constructor(private readonly repository: BusinessEntityRepository) {}

  async execute(): Promise<BusinessEntity[]> {
    return this.repository.findAll();
  }
}