import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nume!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  parola!: string;
}
