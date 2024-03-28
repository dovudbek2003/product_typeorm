import { ResData } from "src/lib/resData"
import { CreateUserDto } from "../dto/create-user.dto"
import { User } from "../entities/user.entity"
import { UpdateUserDto } from "../dto/update-user.dto"

export interface IUserResData {
    user: User
    token: string
}

export interface IUserService {
    create(createUserDto: CreateUserDto): Promise<ResData<IUserResData>>

    findAll(): Promise<ResData<Array<User>>>

    findOne(id: number): Promise<ResData<User>>

    findByLogin(login: string): Promise<User>

    update(id: number, updateUserDto: UpdateUserDto): Promise<ResData<User>>

    remove(id: number): Promise<ResData<User>>
}