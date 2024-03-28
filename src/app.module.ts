import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/entities/category.entity';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/entities/product.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { SharedModule } from './modules/shared/shared.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { Transaction } from './modules/transaction/entities/transaction.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { FileModule } from './modules/file/file.module';
import { File } from './modules/file/entities/file.entity';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: { host: '127.0.0.1', port: 6379 },
          ttl: 3600 * 1000
        })

        return { store }
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sql36883235',
      database: 'product_typeorm',
      entities: [Category, Product, User, Transaction, File],
      synchronize: true,
    }),
    CategoryModule,
    ProductModule,
    AuthModule,
    UserModule,
    SharedModule,
    TransactionModule,
    FileModule,
  ],
})
export class AppModule { }
