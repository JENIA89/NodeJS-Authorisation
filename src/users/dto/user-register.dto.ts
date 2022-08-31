import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'incorrect email' })
  email: string;

  @IsString({ message: 'incorrect name' })
  name: string;

  @IsString({ message: 'incorrect password' })
  password: string;
}
