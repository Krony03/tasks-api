import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  details: string;

  @IsOptional()
  @IsNumber()
  deadline: number;

  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}
