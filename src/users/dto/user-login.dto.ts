import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString({ message: 'incorrect password' })
  password: string;

  @IsEmail({}, { message: 'incorrect email' })
  email: string;
}
