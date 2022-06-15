import { IsNotEmpty } from 'class-validator';

export class CustomerDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;
}
