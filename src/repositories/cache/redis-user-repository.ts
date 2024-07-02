import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../user-repository';
import { User } from 'src/entities/user.entity';
import { PrismaService } from 'src/entities/config/prisma';
import { RedisService } from 'src/entities/config/redis';

@Injectable()
export class RedisUserRepository implements IUserRepository {
  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}
  async findMany(): Promise<User[]> {
    const cachedUsers = await this.redis.get('users');

    if (!cachedUsers) {
      const users = await this.prisma.user.findMany();

      // IF redis search for 'users' aint true, he will set
      // users response from the database
      // EX, 15 => after 15 seconds the cache will be atualized
      await this.redis.set('users', JSON.stringify(users), 'EX', 15)
      console.log('\x1b[33m%s\x1b[0m', 'From Database')
      return users;
    }

    console.log('\x1b[36m%s\x1b[0m', 'From Cache')
    // JSON.parse because cachedUsers response is string
    return JSON.parse(cachedUsers)
  }
}
