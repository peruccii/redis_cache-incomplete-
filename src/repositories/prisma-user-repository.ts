import { PrismaService } from "src/entities/config/prisma";
import { IUserRepository } from "./user-repository";
import { User } from "src/entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findMany(): Promise<User[]> {
        const users = await this.prisma.user.findMany()
        return users
    }
}