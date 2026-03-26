import { IsInt, Min } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  vacationPackageId: number;

  @IsInt()
  @Min(1)
  numarPersoane: number;
}
