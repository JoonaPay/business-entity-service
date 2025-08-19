import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessmemberMapper } from '@modules/business-member/infrastructure/mappers/business-member.mapper';
import { BusinessmemberOrmEntity } from '@modules/business-member/infrastructure/orm-entities/business-member.orm-entity';
import { BusinessMember } from '@modules/business-member/domain/entities/business-member.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BusinessmemberRepository {
  constructor(
    @InjectRepository(BusinessmemberOrmEntity)
    private readonly repository: Repository<BusinessmemberOrmEntity>,
    private readonly mapper: BusinessmemberMapper,
  ) {}

  async create(entity: BusinessMember): Promise<BusinessMember> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    const savedOrmEntity = await this.repository.save(ormEntity);
    return this.mapper.toDomainEntity(savedOrmEntity);
  }

  async findById(id: string): Promise<BusinessMember | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
    });
    if (!ormEntity) {
      return null;
    }
    return this.mapper.toDomainEntity(ormEntity);
  }

  async findAll(): Promise<BusinessMember[]> {
    const ormEntities = await this.repository.find();
    if (!ormEntities) {
      return [];
    }
    return ormEntities.map((ormEntity) =>
      this.mapper.toDomainEntity(ormEntity),
    );
  }

  async update(id: string, entity: BusinessMember): Promise<BusinessMember> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    await this.repository.update(id, ormEntity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
