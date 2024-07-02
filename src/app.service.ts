import { Injectable } from '@nestjs/common';
import { IUserRepository } from './repositories/user-repository';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: IUserRepository) {}
  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.findMany()
    return users
  }
}
