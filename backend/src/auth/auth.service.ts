import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const existent = await this.usersService.findByEmail(dto.email);
    if (existent) {
      throw new UnauthorizedException('Email deja utilizat.');
    }

    const hashed = await bcrypt.hash(dto.parola, 10);
    const user = await this.usersService.create({
      nume: dto.nume,
      email: dto.email,
      parola: hashed
    });

    return this.createToken(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Date de autentificare invalide.');

    const valid = await bcrypt.compare(dto.parola, user.parola);
    if (!valid) throw new UnauthorizedException('Date de autentificare invalide.');

    return this.createToken(user.id, user.email);
  }

  private createToken(userId: number, email: string) {
    return {
      access_token: this.jwtService.sign({ sub: userId, email })
    };
  }
}
