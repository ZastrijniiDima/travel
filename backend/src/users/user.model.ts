import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Booking } from '../bookings/booking.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  nume!: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  parola!: string;

  @HasMany(() => Booking)
  rezervari!: Booking[];
}
