import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { SharedModule } from '../../shared/shared.module';
import { CustomerRepository } from './customer.repository';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository]), SharedModule],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
