import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { Repositories } from "@modules/business-entity/infrastructure/repositories";
import { Queries } from "@modules/business-entity/application/queries";
import { Mappers } from "@modules/business-entity/infrastructure/mappers";
import { UseCases } from "@modules/business-entity/application/domain/usecases";
import { Controllers } from "@modules/business-entity/application/controllers";
import { CommandHandlers } from "@modules/business-entity/application/commands";
import { OrmEntities } from "@modules/business-entity/infrastructure/orm-entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Services } from "@modules/business-entity/application/domain/services";

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
export class BusinessEntityModule {}