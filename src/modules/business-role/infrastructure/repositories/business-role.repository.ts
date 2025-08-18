import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BusinessroleMapper } from "@modules/business-role/infrastructure/mappers/business-role.mapper";
import { BusinessroleOrmEntity } from "@modules/business-role/infrastructure/orm-entities/business-role.orm-entity";
import { BusinessroleEntity } from "@modules/business-role/domain/entities/business-role.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessroleRepository {
  constructor(
    @InjectRepository(BusinessroleOrmEntity)
    private readonly repository: Repository<BusinessroleOrmEntity>,
    private readonly mapper: BusinessroleMapper,
  ) {}

  async create(entity: BusinessroleEntity): Promise<BusinessroleEntity> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    const savedOrmEntity = await this.repository.save(ormEntity);
    return this.mapper.toDomainEntity(savedOrmEntity);
  }

  async findById(id: string): Promise<BusinessroleEntity | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
    });
    if (!ormEntity) {
      return null;
    }
    return this.mapper.toDomainEntity(ormEntity);
  }

  async findAll(): Promise<BusinessroleEntity[]> {
    const ormEntities = await this.repository.find();
    if (!ormEntities) {
      return [];
    }
    return ormEntities.map((ormEntity) =>
      this.mapper.toDomainEntity(ormEntity),
    );
  }

  async update(
    id: string,
    entity: BusinessroleEntity,
  ): Promise<BusinessroleEntity> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    await this.repository.update(id, ormEntity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}