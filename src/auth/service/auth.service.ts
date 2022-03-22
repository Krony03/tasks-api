import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { CredentialsDTO } from 'src/users/dto/credentials.dto';
import { UserRole } from 'src/users/model/user-roles.enum';
import { User } from 'src/users/model/user.entity';
import { UserRepository } from 'src/users/repository/users.repository';
import { JWTReturnDTO } from '../dto/jwt-return.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDTO: CreateUserDTO): Promise<User> {
    if (createUserDTO.password !== createUserDTO.confirmationPassword) {
      throw new Error('Passwords do not match');
    } else {
      return await this.userRepository.createUser(createUserDTO, UserRole.USER);
    }
  }

  async signIn(credentialsDTO: CredentialsDTO): Promise<JWTReturnDTO> {
    const user = await this.userRepository.checkCredentials(credentialsDTO);
    if (user === null) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    const jwtPayload = {
      id: user.uuid,
    };
    const token = await this.jwtService.sign(jwtPayload);
    return {
      accessToken: token,
      refreshToken: '',
    };
  }
}
