import { User } from "../entities/user.entity";

export interface IUserRepository {
    insert(entity: User): Promise<User>
    findAll(): Promise<Array<User>>
    findOneById(id: number): Promise<User>
    findByLogin(login: string): Promise<User>
    update(entity: User): Promise<User>
    remove(id: number): Promise<User>
}