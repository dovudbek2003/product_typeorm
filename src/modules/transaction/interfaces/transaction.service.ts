import { ResData } from "src/lib/resData"
import { CreateTransactionDto } from "../dto/create-transaction.dto"
import { UpdateTransactionDto } from "../dto/update-transaction.dto"
import { User } from "src/modules/user/entities/user.entity"
import { Transaction } from "../entities/transaction.entity"

export interface ITransactionService {
    create(createTransactionDto: CreateTransactionDto, currentUser:User): Promise<ResData<Transaction>>

    findAll(): Promise<ResData<Array<Transaction>>>

    findOne(id: number): Promise<ResData<Transaction>>

    update(id: number, updateTransactionDto: UpdateTransactionDto, currentUser:User): Promise<ResData<Transaction>>

    remove(id: number): Promise<ResData<Transaction>>
}