import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  HttpStatus,
  Query,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBusinessmemberCommand } from '@modules/business-member/application/commands/create-business-member.command';
import { CreateBusinessmemberDto } from '@modules/business-member/application/dto/requests/create-business-member.dto';
import { GetBusinessMemberUseCase } from '@modules/business-member/application/usecases/get-business-member.use-case';
import { ListBusinessMembersUseCase } from '@modules/business-member/application/usecases/list-business-members.use-case';

// DTOs for Swagger documentation
class BusinessMemberResponseDto {
  id: string;
  businessId: string;
  userId: string;
  roleId: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
  joinedAt: Date;
  invitedBy?: string;
  permissions: string[];
  isOwner: boolean;
  metadata: Record<string, any>;
  lastActivityAt?: Date;
  activityHistory: Array<{
    action: string;
    timestamp: Date;
    details?: Record<string, any>;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

class UpdateBusinessMemberDto {
  roleId?: string;
  permissions?: string[];
  metadata?: Record<string, any>;
}

class MemberListQueryDto {
  businessId?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
  roleId?: string;
  isOwner?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}

class TransferOwnershipDto {
  newOwnerId: string;
  confirmationMessage?: string;
}

@ApiTags('business-members')
@Controller('business-members')
export class BusinessmemberController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly getBusinessMemberUseCase: GetBusinessMemberUseCase,
    private readonly listBusinessMembersUseCase: ListBusinessMembersUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new business member',
    description: 'Adds a new member to a business with specified role and permissions.',
  })
  @ApiBody({ type: CreateBusinessmemberDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Business member created successfully',
    type: BusinessMemberResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User is already a member of this business',
  })
  create(@Body() dto: CreateBusinessmemberDto) {
    const contextId = 'extracted-from-token'; // TODO: Get from auth decorator
    const command = new CreateBusinessmemberCommand(dto, contextId);
    return this.commandBus.execute(command);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all business members',
    description: 'Retrieves a list of business members with optional filtering and pagination.',
  })
  @ApiQuery({ name: 'businessId', required: false, description: 'Filter by business ID' })
  @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING'], description: 'Filter by member status' })
  @ApiQuery({ name: 'roleId', required: false, description: 'Filter by role ID' })
  @ApiQuery({ name: 'isOwner', required: false, type: Boolean, description: 'Filter by ownership status' })
  @ApiQuery({ name: 'search', required: false, description: 'Search members by name or email' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of business members retrieved successfully',
    type: [BusinessMemberResponseDto],
  })
  async findAll(@Query() query: MemberListQueryDto) {
    return this.listBusinessMembersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get business member by ID',
    description: 'Retrieves detailed information about a specific business member.',
  })
  @ApiParam({ name: 'id', description: 'Business member ID', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business member retrieved successfully',
    type: BusinessMemberResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business member not found',
  })
  async findOne(@Param('id') id: string) {
    return this.getBusinessMemberUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update business member',
    description: 'Updates a business member\'s role, permissions, or metadata.',
  })
  @ApiParam({ name: 'id', description: 'Business member ID', type: 'string' })
  @ApiBody({ type: UpdateBusinessMemberDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business member updated successfully',
    type: BusinessMemberResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business member not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient permissions to update this member',
  })
  update(@Param('id') id: string, @Body() dto: UpdateBusinessMemberDto) {
    // TODO: Implement update command
    return {
      message: 'Feature coming soon - update command not yet implemented',
      id,
      updates: dto
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove business member',
    description: 'Removes a member from the business (soft delete).',
  })
  @ApiParam({ name: 'id', description: 'Business member ID', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business member removed successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Business member removed successfully' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business member not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Cannot remove business owner or insufficient permissions',
  })
  delete(@Param('id') id: string) {
    // TODO: Implement delete command
    return {
      success: true,
      message: 'Feature coming soon - delete command not yet implemented',
      id
    };
  }

  @Patch(':id/activate')
  @ApiOperation({
    summary: 'Activate business member',
    description: 'Activates a suspended or inactive business member.',
  })
  @ApiParam({ name: 'id', description: 'Business member ID', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business member activated successfully',
    type: BusinessMemberResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business member not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Member is already active or cannot be activated',
  })
  activate(@Param('id') id: string) {
    // TODO: Implement activate command
    return {
      message: 'Feature coming soon - activate command not yet implemented',
      id,
      status: 'ACTIVE'
    };
  }

  @Patch(':id/deactivate')
  @ApiOperation({
    summary: 'Deactivate business member',
    description: 'Deactivates an active business member.',
  })
  @ApiParam({ name: 'id', description: 'Business member ID', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business member deactivated successfully',
    type: BusinessMemberResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business member not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Cannot deactivate business owner',
  })
  deactivate(@Param('id') id: string) {
    // TODO: Implement deactivate command
    return {
      message: 'Feature coming soon - deactivate command not yet implemented',
      id,
      status: 'INACTIVE'
    };
  }

  @Patch(':id/suspend')
  @ApiOperation({
    summary: 'Suspend business member',
    description: 'Suspends a business member with an optional reason.',
  })
  @ApiParam({ name: 'id', description: 'Business member ID', type: 'string' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        reason: { type: 'string', description: 'Reason for suspension' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business member suspended successfully',
    type: BusinessMemberResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business member not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Cannot suspend business owner',
  })
  suspend(@Param('id') id: string, @Body() body: { reason?: string }) {
    // TODO: Implement suspend command
    return {
      message: 'Feature coming soon - suspend command not yet implemented',
      id,
      status: 'SUSPENDED',
      reason: body.reason
    };
  }

  @Patch(':id/unsuspend')
  @ApiOperation({
    summary: 'Unsuspend business member',
    description: 'Reactivates a suspended business member.',
  })
  @ApiParam({ name: 'id', description: 'Business member ID', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business member unsuspended successfully',
    type: BusinessMemberResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business member not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Member is not suspended',
  })
  unsuspend(@Param('id') id: string) {
    // TODO: Implement unsuspend command
    return {
      message: 'Feature coming soon - unsuspend command not yet implemented',
      id,
      status: 'ACTIVE'
    };
  }

  @Post(':id/transfer-ownership')
  @ApiOperation({
    summary: 'Transfer business ownership',
    description: 'Transfers business ownership from current owner to another member.',
  })
  @ApiParam({ name: 'id', description: 'Current owner member ID', type: 'string' })
  @ApiBody({ type: TransferOwnershipDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ownership transferred successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Ownership transferred successfully' },
        previousOwnerId: { type: 'string' },
        newOwnerId: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Member not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Only current owner can transfer ownership',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'New owner must be an existing member',
  })
  transferOwnership(@Param('id') id: string, @Body() dto: TransferOwnershipDto) {
    // TODO: Implement transfer ownership command
    return {
      success: true,
      message: 'Feature coming soon - transfer ownership command not yet implemented',
      previousOwnerId: id,
      newOwnerId: dto.newOwnerId,
      confirmation: dto.confirmationMessage
    };
  }

  @Get(':id/activity')
  @ApiOperation({
    summary: 'Get member activity history',
    description: 'Retrieves the activity history for a specific business member.',
  })
  @ApiParam({ name: 'id', description: 'Business member ID', type: 'string' })
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Number of days to look back (default: 30)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Maximum number of activities to return' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Member activity history retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        memberId: { type: 'string' },
        activities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              action: { type: 'string' },
              timestamp: { type: 'string', format: 'date-time' },
              details: { type: 'object' }
            }
          }
        },
        totalCount: { type: 'number' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business member not found',
  })
  getActivity(@Param('id') id: string, @Query() query: { days?: number; limit?: number }) {
    // TODO: Implement get activity query
    return {
      memberId: id,
      activities: [],
      totalCount: 0,
      message: 'Feature coming soon - activity query not yet implemented',
      filters: query
    };
  }
}