import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './entities/config/prisma';
import { PrismaUserRepository } from './repositories/prisma-user-repository';
import { IUserRepository } from './repositories/user-repository';
import { RedisUserRepository } from './repositories/cache/redis-user-repository';
import { RedisService } from './entities/config/redis';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, RedisService,
    {
      provide: IUserRepository,
      useClass: RedisUserRepository
    }
  ],
})
export class AppModule {}
