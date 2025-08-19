import { Body, Controller, Get, Param, Post, Delete, Put } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateBusinessmemberCommand } from "@modules/business-member/application/commands/create-business-member.command";
import { CreateBusinessmemberDto } from "@modules/business-member/application/dto/requests/create-business-member.dto";
import { GetBusinessMemberUseCase } from "@modules/business-member/application/usecases/get-business-member.use-case";
import { ListBusinessMembersUseCase } from "@modules/business-member/application/usecases/list-business-members.use-case";

@Controller("business-members")
export class BusinessmemberController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly getBusinessMemberUseCase: GetBusinessMemberUseCase,
    private readonly listBusinessMembersUseCase: ListBusinessMembersUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateBusinessmemberDto) {
    const contextId = "extracted-from-token"; // TODO: Get from auth decorator
    const command = new CreateBusinessmemberCommand(dto, contextId);
    return this.commandBus.execute(command);
  }

  @Get()
  async findAll() {
    return this.listBusinessMembersUseCase.execute();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.getBusinessMemberUseCase.execute(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: any) {
    // TODO: Implement update command
    throw new Error("Not implemented");
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    // TODO: Implement delete command
    throw new Error("Not implemented");
  }
}