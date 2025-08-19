import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessEntityRepository } from '@modules/business-entity/infrastructure/repositories';

@Injectable()
export class DeleteBusinessEntityUseCase {
  constructor(private readonly repository: BusinessEntityRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException(`Business entity with ID ${id} not found`);
    }

    entity.softDelete();
    await this.repository.update(id, entity);

    return {
      success: true,
      message: `Business entity ${id} has been deleted`,
    };
  }
}
