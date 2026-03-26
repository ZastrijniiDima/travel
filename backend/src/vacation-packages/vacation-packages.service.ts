import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VacationPackage } from './vacation-package.model';
import { CreateVacationPackageDto } from './dto/create-vacation-package.dto';

@Injectable()
export class VacationPackagesService {
  constructor(
    @InjectModel(VacationPackage)
    private readonly vacationPackageModel: typeof VacationPackage
  ) {}

  create(dto: CreateVacationPackageDto) {
    return this.vacationPackageModel.create(dto as any);
  }

  findAll() {
    return this.vacationPackageModel.findAll({ order: [['createdAt', 'DESC']] });
  }

  async findOne(id: number) {
    const data = await this.vacationPackageModel.findByPk(id);
    if (!data) throw new NotFoundException('Oferta nu a fost găsită.');
    return data;
  }
}
