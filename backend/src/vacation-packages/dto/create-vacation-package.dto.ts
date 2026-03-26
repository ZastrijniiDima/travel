import { IsDateString, IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateVacationPackageDto {
  @IsNotEmpty()
  titlu: string;

  @IsNotEmpty()
  descriere: string;

  @IsNotEmpty()
  destinatie: string;

  @IsNumber()
  @Min(0)
  pret: number;

  @IsInt()
  @Min(1)
  locuriDisponibile: number;

  @IsDateString()
  dataPlecare: string;
}
