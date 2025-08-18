import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BusinessinvitationMapper } from "@modules/business-invitation/infrastructure/mappers/business-invitation.mapper";
import { BusinessinvitationOrmEntity } from "@modules/business-invitation/infrastructure/orm-entities/business-invitation.orm-entity";
import { BusinessinvitationEntity } from "@modules/business-invitation/domain/entities/business-invitation.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessinvitationRepository {
  constructor(
    @InjectRepository(BusinessinvitationOrmEntity)
    private readonly repository: Repository<BusinessinvitationOrmEntity>,
    private readonly mapper: BusinessinvitationMapper,
  ) {}

  async create(entity: BusinessinvitationEntity): Promise<BusinessinvitationEntity> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    const savedOrmEntity = await this.repository.save(ormEntity);
    return this.mapper.toDomainEntity(savedOrmEntity);
  }

  async findById(id: string): Promise<BusinessinvitationEntity | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
    });
    if (!ormEntity) {
      return null;
    }
    return this.mapper.toDomainEntity(ormEntity);
  }

  async findAll(): Promise<BusinessinvitationEntity[]> {
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
    entity: BusinessinvitationEntity,
  ): Promise<BusinessinvitationEntity> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    await this.repository.update(id, ormEntity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}