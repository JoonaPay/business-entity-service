import { Body, Controller, Get, Param, Post, Delete, Put } from "@nestjs/common";
import { CreateBusinessEntityCommand } from "../commands/create-business-entity.command";
import { UpdateBusinessEntityCommand } from "../commands/update-business-entity.command";
import { DeleteBusinessEntityCommand } from "../commands/delete-business-entity.command";
import { CreateBusinessEntityUseCase } from "../usecases/create-business-entity.use-case";
import { GetBusinessEntityUseCase } from "../usecases/get-business-entity.use-case";
import { ListBusinessEntitiesUseCase } from "../usecases/list-business-entities.use-case";
import { UpdateBusinessEntityUseCase } from "../usecases/update-business-entity.use-case";
import { DeleteBusinessEntityUseCase } from "../usecases/delete-business-entity.use-case";
import { CreateBusinessEntityDto } from "../dto/requests/create-business-entity.dto";
import { UpdateBusinessEntityDto } from "../dto/requests/update-business-entity.dto";

@Controller("business-entities")
export class BusinessEntityController {
  constructor(
    private readonly createBusinessEntityUseCase: CreateBusinessEntityUseCase,
    private readonly getBusinessEntityUseCase: GetBusinessEntityUseCase,
    private readonly listBusinessEntitiesUseCase: ListBusinessEntitiesUseCase,
    private readonly updateBusinessEntityUseCase: UpdateBusinessEntityUseCase,
    private readonly deleteBusinessEntityUseCase: DeleteBusinessEntityUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateBusinessEntityDto) {
    const ownerId = "current-user-id"; // TODO: Get from auth decorator
    const command = new CreateBusinessEntityCommand(
      dto.name,
      dto.legalName,
      dto.legalStructure,
      dto.businessType,
      dto.industryCode,
      dto.address,
      dto.contactInfo,
      ownerId,
      dto.description
    );
    return this.createBusinessEntityUseCase.execute(command);
  }

  @Get()
  async findAll() {
    return this.listBusinessEntitiesUseCase.execute();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.getBusinessEntityUseCase.execute(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateBusinessEntityDto) {
    const command = new UpdateBusinessEntityCommand(
      id,
      dto.description,
      dto.address,
      dto.contactInfo,
      dto.settings
    );
    return this.updateBusinessEntityUseCase.execute(command);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.deleteBusinessEntityUseCase.execute(id);
  }
}