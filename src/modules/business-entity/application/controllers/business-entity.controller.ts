import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateBusinessEntityCommand } from '../commands/create-business-entity.command';
import { UpdateBusinessEntityCommand } from '../commands/update-business-entity.command';
import { DeleteBusinessEntityCommand } from '../commands/delete-business-entity.command';
import { CreateBusinessEntityUseCase } from '../usecases/create-business-entity.use-case';
import { GetBusinessEntityUseCase } from '../usecases/get-business-entity.use-case';
import { ListBusinessEntitiesUseCase } from '../usecases/list-business-entities.use-case';
import { UpdateBusinessEntityUseCase } from '../usecases/update-business-entity.use-case';
import { DeleteBusinessEntityUseCase } from '../usecases/delete-business-entity.use-case';
import { CreateBusinessEntityDto } from '../dto/requests/create-business-entity.dto';
import { UpdateBusinessEntityDto } from '../dto/requests/update-business-entity.dto';
import { 
  BusinessEntitySummaryResponseDto, 
  BusinessEntityDetailResponseDto,
  DeleteBusinessEntityResponseDto 
} from '../dto/responses/business-entity.response.dto';

@ApiTags('business-entities')
@Controller('business-entities')
export class BusinessEntityController {
  constructor(
    private readonly createBusinessEntityUseCase: CreateBusinessEntityUseCase,
    private readonly getBusinessEntityUseCase: GetBusinessEntityUseCase,
    private readonly listBusinessEntitiesUseCase: ListBusinessEntitiesUseCase,
    private readonly updateBusinessEntityUseCase: UpdateBusinessEntityUseCase,
    private readonly deleteBusinessEntityUseCase: DeleteBusinessEntityUseCase,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new business entity',
    description: 'Creates a new business entity with the provided information. This will be set as a root organization by default.'
  })
  @ApiBody({ type: CreateBusinessEntityDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Business entity created successfully',
    type: BusinessEntitySummaryResponseDto
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  async create(@Body() dto: CreateBusinessEntityDto) {
    const ownerId = 'current-user-id'; // TODO: Get from auth decorator
    const command = new CreateBusinessEntityCommand(
      dto.name,
      dto.legalName,
      dto.legalStructure,
      dto.businessType,
      dto.industryCode,
      dto.address,
      dto.contactInfo,
      ownerId,
      dto.description,
    );
    return this.createBusinessEntityUseCase.execute(command);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all business entities',
    description: 'Retrieves a list of all business entities with summary information.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'List of business entities retrieved successfully',
    type: [BusinessEntitySummaryResponseDto]
  })
  async findAll() {
    return this.listBusinessEntitiesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get business entity by ID',
    description: 'Retrieves detailed information about a specific business entity.'
  })
  @ApiParam({ name: 'id', description: 'Business entity ID', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Business entity retrieved successfully',
    type: BusinessEntityDetailResponseDto
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Business entity not found' })
  async findOne(@Param('id') id: string) {
    return this.getBusinessEntityUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Update business entity',
    description: 'Updates an existing business entity with the provided information.'
  })
  @ApiParam({ name: 'id', description: 'Business entity ID', type: 'string' })
  @ApiBody({ type: UpdateBusinessEntityDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Business entity updated successfully',
    type: BusinessEntityDetailResponseDto
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Business entity not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  async update(@Param('id') id: string, @Body() dto: UpdateBusinessEntityDto) {
    const command = new UpdateBusinessEntityCommand(
      id,
      dto.description,
      dto.address,
      dto.contactInfo,
      dto.settings,
    );
    return this.updateBusinessEntityUseCase.execute(command);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete business entity',
    description: 'Soft deletes a business entity. The entity will be marked as deleted but retained in the database.'
  })
  @ApiParam({ name: 'id', description: 'Business entity ID', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Business entity deleted successfully',
    type: DeleteBusinessEntityResponseDto
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Business entity not found' })
  async delete(@Param('id') id: string) {
    return this.deleteBusinessEntityUseCase.execute(id);
  }
}
