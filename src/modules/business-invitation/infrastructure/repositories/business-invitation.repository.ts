import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BusinessInvitationMapper } from "@modules/business-invitation/infrastructure/mappers";
import { BusinessInvitationOrmEntity } from "@modules/business-invitation/infrastructure/orm-entities";
import { BusinessInvitation } from "@modules/business-invitation/domain/entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BusinessInvitationRepository {
  constructor(
    @InjectRepository(BusinessInvitationOrmEntity)
    private readonly repository: Repository<BusinessInvitationOrmEntity>,
    private readonly mapper: BusinessInvitationMapper,
  ) {}

  async create(entity: BusinessInvitation): Promise<BusinessInvitation> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    const savedOrmEntity = await this.repository.save(ormEntity);
    return this.mapper.toDomainEntity(savedOrmEntity);
  }

  async findById(id: string): Promise<BusinessInvitation | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
    });
    if (!ormEntity) {
      return null;
    }
    return this.mapper.toDomainEntity(ormEntity);
  }

  async findAll(): Promise<BusinessInvitation[]> {
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
    entity: BusinessInvitation,
  ): Promise<BusinessInvitation> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    await this.repository.update(id, ormEntity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}