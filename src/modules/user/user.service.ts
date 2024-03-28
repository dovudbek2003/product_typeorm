import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserResData, IUserService } from './interfaces/user.service';
import { IUserRepository } from './interfaces/user.repository';
import { ResData } from 'src/lib/resData';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/lib/bcrypt';
import { UserAlreadyExist, UserNotFound } from './exception/user.exception';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/redis.enum';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly repository: IUserRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private jwtService: JwtService
  ) { }


  async create(createUserDto: CreateUserDto): Promise<ResData<IUserResData>> {
    if (await this.findByLogin(createUserDto.login)) {
      throw new UserAlreadyExist()
    }

    let newUser = new User()
    newUser = Object.assign(newUser, createUserDto)
    newUser.password = await hashPassword(newUser.password)

    const createdUser = await this.repository.insert(newUser)
    const token = await this.jwtService.signAsync({ id: createdUser.id })

    await this.cacheManager.del(RedisKeys.ALL_USERS)

    return new ResData<IUserResData>('create', 201, { user: createdUser, token })
  }

  async findAll(): Promise<ResData<User[]>> {
    const getData: Array<User> = await this.cacheManager.get(RedisKeys.ALL_USERS)
    if (getData) {
      // console.log('redisda bor');
      return new ResData('get all', 200, getData)
    }
    const users = await this.repository.findAll()

    // console.log('redisda yo\'q');
    await this.cacheManager.set(RedisKeys.ALL_USERS, users)

    return new ResData<Array<User>>('get all', 200, users)
  }

  async findOne(id: number): Promise<ResData<User>> {
    const foundUser = await this.repository.findOneById(id)
    if (!foundUser) {
      throw new UserNotFound()
    }

    const getData: User = await this.cacheManager.get(RedisKeys.ALL_USER_ID + id)
    if (getData) {
      // console.log('redis dan olindi');
      return new ResData('get one', 200, getData)
    }

    // console.log('pastgresdan olindi');
    await this.cacheManager.set(RedisKeys.ALL_USER_ID + id, foundUser)

    return new ResData<User>('get one', 200, foundUser)
  }

  async findByLogin(login: string): Promise<User> {
    return await this.repository.findByLogin(login)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResData<User>> {
    const { data: foundUser } = await this.findOne(id)
    if (foundUser.login !== updateUserDto.login && await this.findByLogin(updateUserDto.login)) {
      throw new UserAlreadyExist()
    }

    const newUser = Object.assign(foundUser, updateUserDto)
    newUser.password = await hashPassword(newUser.password)
    const updatedUser = await this.repository.update(newUser)

    await this.cacheManager.del(RedisKeys.ALL_USERS)

    return new ResData('update', 200, updatedUser)
  }

  async remove(id: number): Promise<ResData<User>> {
    await this.findOne(id)
    const deletedUser = await this.repository.remove(id)

    await this.cacheManager.del(RedisKeys.ALL_USERS)

    return new ResData('delete', 200, deletedUser)
  }
}
