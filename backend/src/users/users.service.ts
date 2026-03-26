import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  create(dto: CreateUserDto) {
    return this.userModel.create(dto as any);
  }

  findAll() {
    return this.userModel.findAll({ attributes: ['id', 'nume', 'email', 'createdAt'] });
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.userModel.findByPk(id, { attributes: ['id', 'nume', 'email', 'createdAt'] });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) return null;
    await user.update(dto);
    return this.findById(id);
  }
}
