import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "./interfaces/user.repository";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async insert(entity: User): Promise<User> {
        return await this.userRepository.save(entity)
    }
    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }
    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id })
    }
    async findByLogin(login: string): Promise<User> {
        return await this.userRepository.findOneBy({ login })
    }
    async update(entity: User): Promise<User> {
        return await this.userRepository.save(entity)
    }
    async remove(id: number): Promise<User> {
        const foundUser = await this.findOneById(id)
        await this.userRepository.delete({ id })
        return foundUser
    }
}