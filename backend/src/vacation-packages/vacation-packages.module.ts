import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VacationPackage } from './vacation-package.model';
import { VacationPackagesController } from './vacation-packages.controller';
import { VacationPackagesService } from './vacation-packages.service';

@Module({
  imports: [SequelizeModule.forFeature([VacationPackage])],
  controllers: [VacationPackagesController],
  providers: [VacationPackagesService],
  exports: [VacationPackagesService]
})
export class VacationPackagesModule {}
