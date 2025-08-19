import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Repositories } from '@modules/business-role/infrastructure/repositories';
import { Queries } from '@modules/business-role/application/queries';
import { Mappers } from '@modules/business-role/infrastructure/mappers';
import { UseCases } from '@modules/business-role/application/domain/usecases';
import { Controllers } from '@modules/business-role/application/controllers';
import { CommandHandlers } from '@modules/business-role/application/commands';
import { OrmEntities } from '@modules/business-role/infrastructure/orm-entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from '@modules/business-role/application/domain/services';

@Module({
  imports: [TypeOrmModule.forFeature([...OrmEntities]), CqrsModule],
  providers: [
    ...CommandHandlers,
    ...Queries,
    ...Repositories,
    ...Mappers,
    ...UseCases,
    ...Services,
  ],
  controllers: [...Controllers],
})
export class BusinessRoleModule {}
