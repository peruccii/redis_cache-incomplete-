import { User } from "src/entities/user.entity";

export abstract class IUserRepository {
    abstract findMany(): Promise<User[]>
}