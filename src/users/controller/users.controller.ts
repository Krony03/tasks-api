import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserRole } from '../model/user-roles.enum';
import { User } from '../model/user.entity';
import { UsersService } from '../service/users.service';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles([UserRole.ADMIN])
  async createAdminUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.createAdminUser(createUserDTO);
  }

  @Get(':id')
  @Roles([UserRole.ADMIN])
  async findUserById(@Param('id') userId: string): Promise<User> {
    return this.usersService.findUserById(userId);
  }
}
