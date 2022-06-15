import { IsNotEmpty } from 'class-validator';

export class UpdateCustomerDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly surname: string;
}
