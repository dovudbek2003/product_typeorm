import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), SharedModule],
  controllers: [TransactionController],
  providers: [
    { provide: 'ITransactionService', useClass: TransactionService },
    { provide: 'ITransactionRepository', useClass: TransactionRepository }
  ]
})
export class TransactionModule { }
