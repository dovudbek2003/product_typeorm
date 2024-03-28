import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ITransactionService } from './interfaces/transaction.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RolesGuard } from '../shared/guards/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/redis.enum';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(@Inject('ITransactionService') private readonly transactionService: ITransactionService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @CurrentUser() currentUser: User) {
    return this.transactionService.create(createTransactionDto, currentUser);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.ALL_TRANSACTIONS)
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto, @CurrentUser() currentUser: User) {
    return this.transactionService.update(+id, updateTransactionDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
