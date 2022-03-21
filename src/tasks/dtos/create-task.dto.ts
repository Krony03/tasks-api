import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  details: string;

  @IsOptional()
  @IsNumber()
  deadline: number;
}
