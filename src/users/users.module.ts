import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('api.apiUrl'),
        timeout: configService.get<number>('api.httpTimeout'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
