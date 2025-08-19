import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessEntityModule } from './modules/business-entity/business-entity.module';
import { BusinessInvitationModule } from './modules/business-invitation/business-invitation.module';
import { BusinessMemberModule } from './modules/business-member/business-member.module';
import { BusinessRoleModule } from './modules/business-role/business-role.module';
import { HomeController } from './home/home.controller';
import { AdminModule } from './admin/admin.module';
import { BusinessEntityOrmEntity } from './modules/business-entity/infrastructure/orm-entities';
import { BusinessmemberOrmEntity } from './modules/business-member/infrastructure/orm-entities/business-member.orm-entity';
import { BusinessInvitationOrmEntity } from './modules/business-invitation/infrastructure/orm-entities/business-invitation.orm-entity';
import { BusinessroleOrmEntity } from './modules/business-role/infrastructure/orm-entities/business-role.orm-entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [
          BusinessEntityOrmEntity,
          BusinessmemberOrmEntity,
          BusinessInvitationOrmEntity,
          BusinessroleOrmEntity,
        ],
        synchronize: configService.get<boolean>('DATABASE_SYNC', false),
        logging: configService.get<boolean>('DATABASE_LOGGING', false),
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
      }),
    }),
    BusinessEntityModule,
    BusinessInvitationModule,
    BusinessMemberModule,
    BusinessRoleModule,
    AdminModule,
  ],
  controllers: [AppController, HomeController],
  providers: [AppService],
})
export class AppModule {}
