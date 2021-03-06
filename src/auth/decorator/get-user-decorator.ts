import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/model/user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  return req.args[0].user;
});
