import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserRole } from '../model/user-roles.enum';
import { User } from '../model/user.entity';
import { UserRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createAdminUser(createUserDTO: CreateUserDTO): Promise<User> {
    if (createUserDTO.password !== createUserDTO.confirmationPassword) {
      throw new Error('Passwords do not match');
    } else {
      return this.userRepository.createUser(createUserDTO, UserRole.ADMIN);
    }
  }

  async findUserById(userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }
}
