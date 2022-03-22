import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { CredentialsDTO } from 'src/users/dto/credentials.dto';
import { User } from 'src/users/model/user.entity';
import { GetUser } from '../decorator/get-user-decorator';
import { JWTReturnDTO } from '../dto/jwt-return.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.authService.signUp(createUserDTO);
  }

  @Post('sign-in')
  async signIn(@Body() credentialsDTO: CredentialsDTO): Promise<JWTReturnDTO> {
    return await this.authService.signIn(credentialsDTO);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  async getMe(@GetUser() user: User): Promise<User> {
    return user;
  }
}
