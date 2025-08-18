import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { Repositories } from "@modules/business-invitation/infrastructure/repositories";
import { Queries } from "@modules/business-invitation/application/queries";
import { Mappers } from "@modules/business-invitation/infrastructure/mappers";
import { UseCases } from "@modules/business-invitation/application/domain/usecases";
import { Controllers } from "@modules/business-invitation/application/controllers";
import { CommandHandlers } from "@modules/business-invitation/application/commands";
import { OrmEntities } from "@modules/business-invitation/infrastructure/orm-entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Services } from "@modules/business-invitation/application/domain/services";

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
export class BusinessInvitationModule {}