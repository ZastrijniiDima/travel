import {
  Table, Column, Model, DataType, HasMany
} from 'sequelize-typescript';
import { Booking } from '../bookings/booking.model';

@Table({ tableName: 'vacation_packages' })
export class VacationPackage extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  titlu!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  descriere!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  destinatie!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  pret!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  locuriDisponibile!: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  dataPlecare!: string;

  @HasMany(() => Booking)
  rezervari!: Booking[];
}
