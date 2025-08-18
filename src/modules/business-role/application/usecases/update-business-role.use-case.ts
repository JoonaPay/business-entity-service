import { BusinessroleEntity } from "@modules/business-role/domain/entities/business-role.entity";
import { BusinessroleRepository } from "@modules/business-role/infrastructure/repositories/business-role.repository";
import { CreateBusinessroleCommand } from "@modules/business-role/application/commands/create-business-role.command";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateBusinessroleUseCase {
  constructor(private readonly repository: BusinessroleRepository) {}

  async execute(command: CreateBusinessroleCommand) {
    const entity = new BusinessroleEntity(command);
    return this.repository.create(entity);
  }
}