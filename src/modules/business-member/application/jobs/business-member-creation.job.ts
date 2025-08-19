import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateBusinessmemberUseCase } from '../usecases/create-business-member.use-case';
import { CreateBusinessmemberCommand } from '../commands/create-business-member.command';

@Injectable()
export class BusinessMemberCreationJob {
  constructor(
    private readonly createBusinessMemberUseCase: CreateBusinessmemberUseCase,
  ) {}

  @Cron('0 */15 * * * *') // Every 15 minutes
  async processScheduledMemberCreations() {
    // Process any scheduled member creations
    // Using the SAME use case as controller and event handler

    const scheduledCreations = await this.getScheduledCreations(); // Mock method

    for (const creation of scheduledCreations) {
      const command = new CreateBusinessmemberCommand(
        creation,
        'scheduled-job',
      );
      await this.createBusinessMemberUseCase.execute(command);
    }
  }

  private async getScheduledCreations(): Promise<any[]> {
    // Mock implementation - would fetch from database
    return [];
  }
}
