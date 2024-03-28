import { Transaction } from "../entities/transaction.entity"

export interface ITransactionRepository {
    create(entity: Transaction): Promise<Transaction>
    findOneById(id: number): Promise<Transaction>
    findAll(): Promise<Array<Transaction>>
    update(entity: Transaction): Promise<Transaction>
    remove(id: number): Promise<Transaction>
}