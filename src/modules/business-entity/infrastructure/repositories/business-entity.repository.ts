import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BusinessentityMapper } from "@modules/business-entity/infrastructure/mappers/business-entity.mapper";
import { BusinessentityOrmEntity } from "@modules/business-entity/infrastructure/orm-entities/business-entity.orm-entity";
import { BusinessentityEntity } from "@modules/business-entity/domain/entities/business-entity.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessentityRepository {
  constructor(
    @InjectRepository(BusinessentityOrmEntity)
    private readonly repository: Repository<BusinessentityOrmEntity>,
    private readonly mapper: BusinessentityMapper,
  ) {}

  async create(entity: BusinessentityEntity): Promise<BusinessentityEntity> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    const savedOrmEntity = await this.repository.save(ormEntity);
    return this.mapper.toDomainEntity(savedOrmEntity);
  }

  async findById(id: string): Promise<BusinessentityEntity | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
    });
    if (!ormEntity) {
      return null;
    }
    return this.mapper.toDomainEntity(ormEntity);
  }

  async findAll(): Promise<BusinessentityEntity[]> {
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
    entity: BusinessentityEntity,
  ): Promise<BusinessentityEntity> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    await this.repository.update(id, ormEntity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}