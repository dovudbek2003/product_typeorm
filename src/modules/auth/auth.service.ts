import { Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ResData } from 'src/lib/resData';
import { ILoginData } from './interfaces/auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginOrPasswordWrongException } from './exception/auth.exception';
import { isMatch } from 'src/lib/bcrypt';
import { IUserService } from '../user/interfaces/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    private jwtService: JwtService
  ) { }

  async login(dto: AuthDto): Promise<ResData<ILoginData>> {
    const foundUserByLogin = await this.userService.findByLogin(dto.login)
    if (!foundUserByLogin) {
      throw new LoginOrPasswordWrongException()
    }

    if (! await isMatch(dto.password, foundUserByLogin.password)) {
      throw new LoginOrPasswordWrongException()
    }

    const token = await this.jwtService.signAsync({ id: foundUserByLogin.id })

    return new ResData<ILoginData>('success', 200, { user: foundUserByLogin, token })
  }
}
