import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ITransactionService } from './interfaces/transaction.service';
import { ResData } from 'src/lib/resData';
import { ITransactionRepository } from './interfaces/transaction.repository';
import { User } from '../user/entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { TransactionNotFound } from './exception/transaction.exception';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/redis.enum';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject('ITransactionRepository') private readonly repository: ITransactionRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) { }

  async create(createTransactionDto: CreateTransactionDto, currentUser: User): Promise<ResData<Transaction>> {
    let newTransaction = new Transaction()
    newTransaction = Object.assign(newTransaction, createTransactionDto)
    newTransaction.createdBy = currentUser


    const createdTransaction = await this.repository.create(newTransaction)

    await this.cacheManager.del(RedisKeys.ALL_TRANSACTIONS)

    return new ResData('create', 201, createdTransaction)
  }

  async findAll(): Promise<ResData<Transaction[]>> {
    const transactions = await this.repository.findAll()
    return new ResData('get all', 200, transactions)
  }

  async findOne(id: number): Promise<ResData<Transaction>> {
    const foundTransaction = await this.repository.findOneById(id)
    if (!foundTransaction) {
      throw new TransactionNotFound()
    }

    return new ResData('get one', 200, foundTransaction)
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto, currentUser: User): Promise<ResData<Transaction>> {
    const { data: foundTransaction } = await this.findOne(id)
    const newTransaction = Object.assign(foundTransaction, updateTransactionDto)
    newTransaction.lastEditedBy = currentUser

    const updatedTransaction = await this.repository.update(newTransaction)

    await this.cacheManager.del(RedisKeys.ALL_TRANSACTIONS)

    return new ResData('update', 200, updatedTransaction)
  }

  async remove(id: number): Promise<ResData<Transaction>> {
    await this.findOne(id)
    const deletedTransaction = await this.repository.remove(id)

    await this.cacheManager.del(RedisKeys.ALL_TRANSACTIONS)

    return new ResData('delete', 200, deletedTransaction)
  }
}
