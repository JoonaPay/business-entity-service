import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessEntityOrmEntity } from '../modules/business-entity/infrastructure/orm-entities/business-entity.orm-entity';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessEntityOrmEntity]),
  ],
  controllers: [AdminController],
  providers: [],
  exports: [],
})
export class AdminModule {}