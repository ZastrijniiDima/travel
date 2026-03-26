import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VacationPackagesService } from './vacation-packages.service';
import { CreateVacationPackageDto } from './dto/create-vacation-package.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('oferte')
export class VacationPackagesController {
  constructor(private readonly service: VacationPackagesService) {}

  @Get()
  all() {
    return this.service.findAll();
  }

  @Get(':id')
  one(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateVacationPackageDto) {
    return this.service.create(dto);
  }
}
