import { BusinessentityEntity } from "@modules/business-entity/domain/entities/business-entity.entity";
import { BusinessentityRepository } from "@modules/business-entity/infrastructure/repositories/business-entity.repository";
import { CreateBusinessentityCommand } from "@modules/business-entity/application/commands/create-business-entity.command";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateBusinessentityUseCase {
  constructor(private readonly repository: BusinessentityRepository) {}

  async execute(command: CreateBusinessentityCommand) {
    const entity = new BusinessentityEntity(command);
    return this.repository.create(entity);
  }
}