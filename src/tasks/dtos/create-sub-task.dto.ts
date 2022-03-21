import { IsNotEmpty } from 'class-validator';

export class CreateSubTaskDto {
  @IsNotEmpty()
  title: string;
}
