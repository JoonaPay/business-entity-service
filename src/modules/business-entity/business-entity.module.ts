import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { BusinessEntityController } from './application/controllers/business-entity.controller';
import {
  CreateBusinessEntityUseCase,
  GetBusinessEntityUseCase,
  ListBusinessEntitiesUseCase,
  UpdateBusinessEntityUseCase,
  DeleteBusinessEntityUseCase,
} from './application/usecases';
import {
  CreateBusinessEntityHandler,
  UpdateBusinessEntityHandler,
  DeleteBusinessEntityHandler,
} from './application/commands';
import { BusinessEntityOrmEntity } from './infrastructure/orm-entities';
import { BusinessEntityRepository } from './infrastructure/repositories';
import { BusinessEntityMapper } from './infrastructure/mappers';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntityOrmEntity]), CqrsModule],
  providers: [
    BusinessEntityRepository,
    BusinessEntityMapper,
    CreateBusinessEntityUseCase,
    GetBusinessEntityUseCase,
    ListBusinessEntitiesUseCase,
    UpdateBusinessEntityUseCase,
    DeleteBusinessEntityUseCase,
    CreateBusinessEntityHandler,
    UpdateBusinessEntityHandler,
    DeleteBusinessEntityHandler,
  ],
  controllers: [BusinessEntityController],
  exports: [
    BusinessEntityRepository,
    CreateBusinessEntityUseCase,
    GetBusinessEntityUseCase,
    ListBusinessEntitiesUseCase,
    UpdateBusinessEntityUseCase,
    DeleteBusinessEntityUseCase,
  ],
})
export class BusinessEntityModule {}
