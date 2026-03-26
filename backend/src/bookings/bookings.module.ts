import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';
import { VacationPackage } from '../vacation-packages/vacation-package.model';

@Module({
  imports: [SequelizeModule.forFeature([Booking, VacationPackage])],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
