import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwtSecretKey,
      signOptions: { expiresIn: config.jwtExpiredIn },
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository }
  ],
  exports: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository }
  ]
})
export class UserModule { }
