import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { VacationPackage } from '../vacation-packages/vacation-package.model';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking) private readonly bookingModel: typeof Booking,
    @InjectModel(VacationPackage) private readonly packageModel: typeof VacationPackage
  ) {}

  async create(userId: number, dto: CreateBookingDto) {
    const pachet = await this.packageModel.findByPk(dto.vacationPackageId);
    if (!pachet) throw new NotFoundException('Oferta selectată nu există.');
    if (pachet.locuriDisponibile < dto.numarPersoane) {
      throw new BadRequestException('Nu sunt suficiente locuri disponibile.');
    }

    pachet.locuriDisponibile -= dto.numarPersoane;
    await pachet.save();

    return this.bookingModel.create({
      userId,
      vacationPackageId: dto.vacationPackageId,
      numarPersoane: dto.numarPersoane
    } as any);
  }

  findMine(userId: number) {
    return this.bookingModel.findAll({
      where: { userId },
      include: [VacationPackage],
      order: [['createdAt', 'DESC']]
    });
  }
}
