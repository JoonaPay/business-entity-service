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
import { CreateBusinessInvitationCommand } from '@modules/business-invitation/application/commands';
import { CreateBusinessInvitationDto } from '@modules/business-invitation/application/dto/requests';

// DTOs for Swagger documentation
class BusinessInvitationResponseDto {
  id: string;
  businessId: string;
  email: string;
  roleId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'CANCELLED';
  invitedBy: string;
  message?: string;
  token: string;
  expiresAt: Date;
  invitationType: 'EMAIL' | 'DIRECT' | 'BULK';
  createdAt: Date;
  updatedAt: Date;
}

class UpdateBusinessInvitationDto {
  message?: string;
  roleId?: string;
  expirationDate?: Date;
}

class InvitationListQueryDto {
  businessId?: string;
  status?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'CANCELLED';
  email?: string;
  page?: number;
  limit?: number;
}

@ApiTags('business-invitations')
@Controller('business-invitations')
export class BusinessInvitationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new business invitation',
    description: 'Sends an invitation to a user to join a business with a specific role.',
  })
  @ApiBody({ type: CreateBusinessInvitationDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Business invitation created and sent successfully',
    type: BusinessInvitationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already invited or is a member',
  })
  create(@Body() dto: CreateBusinessInvitationDto) {
    const contextId = 'extracted-from-token'; // TODO: Get from auth decorator
    const command = new CreateBusinessInvitationCommand(dto, contextId);
    return this.commandBus.execute(command);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all business invitations',
    description: 'Retrieves a list of business invitations with optional filtering.',
  })
  @ApiQuery({ name: 'businessId', required: false, description: 'Filter by business ID' })
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED'], description: 'Filter by invitation status' })
  @ApiQuery({ name: 'email', required: false, description: 'Filter by invitee email' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of business invitations retrieved successfully',
    type: [BusinessInvitationResponseDto],
  })
  findAll(@Query() query: InvitationListQueryDto) {
    // TODO: Implement query handler
    return {
      data: [],
      total: 0,
      page: query.page || 1,
      limit: query.limit || 10,
      message: 'Feature coming soon - query handler not yet implemented'
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get business invitation by ID',
    description: 'Retrieves detailed information about a specific business invitation.',
  })
  @ApiParam({ name: 'id', description: 'Business invitation ID', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business invitation retrieved successfully',
    type: BusinessInvitationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business invitation not found',
  })
  findOne(@Param('id') id: string) {
    // TODO: Implement query handler
    return {
      message: 'Feature coming soon - query handler not yet implemented',
      id
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update business invitation',
    description: 'Updates an existing business invitation (message, role, or expiration).',
  })
  @ApiParam({ name: 'id', description: 'Business invitation ID', type: 'string' })
  @ApiBody({ type: UpdateBusinessInvitationDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business invitation updated successfully',
    type: BusinessInvitationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business invitation not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data or invitation cannot be updated',
  })
  update(@Param('id') id: string, @Body() dto: UpdateBusinessInvitationDto) {
    // TODO: Implement update command
    return {
      message: 'Feature coming soon - update command not yet implemented',
      id,
      updates: dto
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Cancel business invitation',
    description: 'Cancels a pending business invitation.',
  })
  @ApiParam({ name: 'id', description: 'Business invitation ID', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business invitation cancelled successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Business invitation cancelled successfully' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business invitation not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invitation cannot be cancelled (not in pending status)',
  })
  delete(@Param('id') id: string) {
    // TODO: Implement delete command
    return {
      success: true,
      message: 'Feature coming soon - delete command not yet implemented',
      id
    };
  }

  @Post(':id/resend')
  @ApiOperation({
    summary: 'Resend business invitation',
    description: 'Resends a pending business invitation email.',
  })
  @ApiParam({ name: 'id', description: 'Business invitation ID', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business invitation resent successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Invitation email resent successfully' },
        resendCount: { type: 'number', example: 2 }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business invitation not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invitation cannot be resent (expired, accepted, or limit reached)',
  })
  resend(@Param('id') id: string) {
    // TODO: Implement resend command
    return {
      success: true,
      message: 'Feature coming soon - resend command not yet implemented',
      id,
      resendCount: 1
    };
  }

  @Post(':token/accept')
  @ApiOperation({
    summary: 'Accept business invitation',
    description: 'Accepts a business invitation using the invitation token.',
  })
  @ApiParam({ name: 'token', description: 'Business invitation token', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business invitation accepted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Invitation accepted successfully' },
        businessId: { type: 'string', example: 'business-uuid' },
        memberId: { type: 'string', example: 'member-uuid' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business invitation not found or invalid token',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invitation expired or already processed',
  })
  accept(@Param('token') token: string) {
    // TODO: Implement accept command
    return {
      success: true,
      message: 'Feature coming soon - accept command not yet implemented',
      token,
      businessId: 'business-uuid',
      memberId: 'member-uuid'
    };
  }

  @Post(':token/reject')
  @ApiOperation({
    summary: 'Reject business invitation',
    description: 'Rejects a business invitation using the invitation token.',
  })
  @ApiParam({ name: 'token', description: 'Business invitation token', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Business invitation rejected successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Invitation rejected successfully' }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Business invitation not found or invalid token',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invitation expired or already processed',
  })
  reject(@Param('token') token: string) {
    // TODO: Implement reject command
    return {
      success: true,
      message: 'Feature coming soon - reject command not yet implemented',
      token
    };
  }
}