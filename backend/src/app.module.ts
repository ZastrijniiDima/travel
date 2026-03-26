import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VacationPackagesModule } from './vacation-packages/vacation-packages.module';
import { BookingsModule } from './bookings/bookings.module';
import { User } from './users/user.model';
import { VacationPackage } from './vacation-packages/vacation-package.model';
import { Booking } from './bookings/booking.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        dialect: 'postgres',
        host: cfg.get<string>('DB_HOST', 'localhost'),
        port: Number(cfg.get<string>('DB_PORT', '5432')),
        username: cfg.get<string>('DB_USER', 'postgres'),
        password: cfg.get<string>('DB_PASSWORD', 'postgres'),
        database: cfg.get<string>('DB_NAME', 'vacation_db'),
        autoLoadModels: true,
        synchronize: true,
        models: [User, VacationPackage, Booking]
      })
    }),
    AuthModule,
    UsersModule,
    VacationPackagesModule,
    BookingsModule
  ]
})
export class AppModule {}
