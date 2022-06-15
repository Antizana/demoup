import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadCustomerAccountDto {
  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly surname: string;
}
