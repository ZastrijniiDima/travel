import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nume!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  parola!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  nume?: string;
}
