import { Repository } from "typeorm";
import { ITransactionRepository } from "./interfaces/transaction.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "./entities/transaction.entity";

export class TransactionRepository implements ITransactionRepository {
    constructor(
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>
    ) { }

    async create(entity: Transaction): Promise<Transaction> {
        return await this.transactionRepository.save(entity)
    }
    async findOneById(id: number): Promise<Transaction> {
        return await this.transactionRepository.findOneBy({ id })
    }
    async findAll(): Promise<Transaction[]> {
        return await this.transactionRepository.find()
    }
    async update(entity: Transaction): Promise<Transaction> {
        return await this.transactionRepository.save(entity)
    }
    async remove(id: number): Promise<Transaction> {
        const foundTransaction = await this.findOneById(id)
        await this.transactionRepository.delete(id)
        return foundTransaction
    }
}