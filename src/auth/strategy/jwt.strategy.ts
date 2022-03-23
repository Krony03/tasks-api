import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtConst } from 'src/config/jwt.consts';
import { User } from 'src/users/model/user.entity';
import { UserRepository } from 'src/users/repository/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtConst.SECRET,
    });
  }

  async validate(payload: { id: string }): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Invalid user');
    }
    return user;
  }
}
