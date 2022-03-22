import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  lastName: string;
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  confirmationPassword: string;
}
