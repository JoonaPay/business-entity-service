import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { Repositories } from "@modules/business-member/infrastructure/repositories";
import { Queries } from "@modules/business-member/application/queries";
import { Mappers } from "@modules/business-member/infrastructure/mappers";
import { UseCases } from "@modules/business-member/application/domain/usecases";
import { Controllers } from "@modules/business-member/application/controllers";
import { CommandHandlers } from "@modules/business-member/application/commands";
import { OrmEntities } from "@modules/business-member/infrastructure/orm-entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Services } from "@modules/business-member/application/domain/services";

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
export class BusinessMemberModule {}