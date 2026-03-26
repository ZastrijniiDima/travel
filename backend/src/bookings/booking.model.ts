import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { VacationPackage } from '../vacation-packages/vacation-package.model';

@Table({ tableName: 'bookings' })
export class Booking extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => VacationPackage)
  @Column({ type: DataType.INTEGER, allowNull: false })
  vacationPackageId!: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  numarPersoane!: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'confirmata' })
  status!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => VacationPackage)
  oferta!: VacationPackage;
}
