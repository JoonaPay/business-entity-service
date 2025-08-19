import { Module } from "@nestjs/common";
import { BusinessEntityController } from "./application/controllers/business-entity.controller";
import { CreateBusinessEntityUseCase, GetBusinessEntityUseCase, ListBusinessEntitiesUseCase, UpdateBusinessEntityUseCase, DeleteBusinessEntityUseCase } from "./application/usecases";
import { CreateBusinessEntityHandler, UpdateBusinessEntityHandler, DeleteBusinessEntityHandler } from "./application/commands";

@Module({
  providers: [
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
    CreateBusinessEntityUseCase,
    GetBusinessEntityUseCase,
    ListBusinessEntitiesUseCase,
    UpdateBusinessEntityUseCase,
    DeleteBusinessEntityUseCase,
  ],
})
export class BusinessEntityModule {}