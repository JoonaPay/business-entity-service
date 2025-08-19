import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BusinessEntityMapper } from "@modules/business-entity/infrastructure/mappers";
import { BusinessEntityOrmEntity } from "@modules/business-entity/infrastructure/orm-entities";
import { BusinessEntity } from "@modules/business-entity/domain/entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessEntityRepository {
  constructor(
    @InjectRepository(BusinessEntityOrmEntity)
    private readonly repository: Repository<BusinessEntityOrmEntity>,
    private readonly mapper: BusinessEntityMapper,
  ) {}

  async create(entity: BusinessEntity): Promise<BusinessEntity> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    const savedOrmEntity = await this.repository.save(ormEntity);
    return this.mapper.toDomainEntity(savedOrmEntity);
  }

  async findById(id: string): Promise<BusinessEntity | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
    });
    if (!ormEntity) {
      return null;
    }
    return this.mapper.toDomainEntity(ormEntity);
  }

  async findAll(): Promise<BusinessEntity[]> {
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
    entity: BusinessEntity,
  ): Promise<BusinessEntity> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    await this.repository.update(id, ormEntity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}