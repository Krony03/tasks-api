import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSubTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}
