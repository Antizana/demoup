import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ReadTransactionDto } from '../../product_number/dto/read_transaction.dto';
import { ReadCustomerAccountDto } from '../../product_name/dto/read_customer_account.dto';

@Exclude()
export class ReadAccountDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsNumber()
  readonly balance: string;

  @Expose()
  @Type(() => ReadCustomerAccountDto)
  readonly customer: ReadCustomerAccountDto;

  @Expose()
  @Type(() => ReadTransactionDto)
  readonly transactions: ReadTransactionDto[];
}
