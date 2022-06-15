import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
// import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import {
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
// import { AuthGuard } from '@nestjs/passport';
import { Customer } from './product_name.entity';
import { CustomerService } from './customer.service';
import { ReadCustomerDto, UpdateCustomerDto } from './dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly _customerService: CustomerService) {}

  @Get(':customerId')
  async getCustomer(
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<ReadCustomerDto> {
    const customer = this._customerService.get(customerId);
    return customer;
  }

  // @UseGuards(AuthGuard())
  @Get()
  async getAllCustomers(): Promise<ReadCustomerDto[]> {
    const customers = await this._customerService.getAll();
    return customers;
  }

  @Post()
  async createCustomer(@Body() customer: Customer): Promise<Customer> {
    const createdCustomer = await this._customerService.create(customer);
    return createdCustomer;
  }

  @Patch(':customerId')
  async updateCustomer(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() customer: UpdateCustomerDto,
  ): Promise<UpdateCustomerDto> {
    const updatedCustomer = await this._customerService.update(
      customerId,
      customer,
    );
    return updatedCustomer;
  }

  @Delete(':customerId')
  async deleteCustomer(
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<boolean> {
    await this._customerService.delete(customerId);
    return true;
  }
}
