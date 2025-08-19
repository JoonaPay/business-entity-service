import { Injectable, NotFoundException } from "@nestjs/common";
import { BusinessEntity } from "@modules/business-entity/domain/entities";
import { BusinessEntityRepository } from "@modules/business-entity/infrastructure/repositories";
import { UpdateBusinessEntityCommand } from "../commands/update-business-entity.command";

@Injectable()
export class UpdateBusinessEntityUseCase {
  constructor(private readonly repository: BusinessEntityRepository) {}

  async execute(command: UpdateBusinessEntityCommand): Promise<BusinessEntity> {
    const entity = await this.repository.findById(command.id);
    if (!entity) {
      throw new NotFoundException(`Business entity with id ${command.id} not found`);
    }

    // Update entity properties
    if (command.description !== undefined) {
      entity.updateDescription(command.description);
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

    return this.repository.update(command.id, entity);
  }
}