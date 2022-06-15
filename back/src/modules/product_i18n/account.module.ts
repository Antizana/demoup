import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { CustomerRepository } from '../product_name/customer.repository';
import { TransactionRepository } from '../product_number/transaction.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountRepository]),
    TypeOrmModule.forFeature([CustomerRepository]),
    TypeOrmModule.forFeature([TransactionRepository]),
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
