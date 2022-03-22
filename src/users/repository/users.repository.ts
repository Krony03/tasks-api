import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserRole } from '../model/user-roles.enum';
import { User } from '../model/user.entity';
import * as bcrypt from 'bcrypt';
import { CredentialsDTO } from '../dto/credentials.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    createUserDTO: CreateUserDTO,
    role: UserRole,
  ): Promise<User> {
    const { email, firstName, lastName, password } = createUserDTO;
    const user = this.create();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await this.save(user);
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findById(userId: string): Promise<User> {
    const user = await this.findOne(
      { uuid: userId },
      {
        select: ['firstName', 'lastName', 'email', 'status', 'role'],
      },
    );
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  async checkCredentials(credentialsDTO: CredentialsDTO): Promise<User> {
    const { email, password } = credentialsDTO;
    const user = await this.findOne({ email });
    if (user && (await user.checkPassword(password))) {
      delete user.salt;
      delete user.password;
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
