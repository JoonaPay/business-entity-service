import { BusinessRole } from '@modules/business-role/domain/entities/business-role.entity';
import { BusinessroleRepository } from '@modules/business-role/infrastructure/repositories/business-role.repository';
import { CreateBusinessroleCommand } from '@modules/business-role/application/commands/create-business-role.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateBusinessroleUseCase {
  constructor(private readonly repository: BusinessroleRepository) {}

  async execute(command: CreateBusinessroleCommand): Promise<BusinessRole> {
    // Create a basic business role with minimal required properties
    const businessRole = new BusinessRole({
      name: 'Default Role',
      description: 'Default business role',
      permissions: [],
      isSystemRole: false,
      isCustomizable: true,
      hierarchy: 100,
      metadata: {},
    });

    return this.repository.create(businessRole);
  }
}
