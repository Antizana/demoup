import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../shared/mapper.service';
import { status } from '../../shared/entity_status.enum';
import { CustomerRepository } from './customer.repository';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Customer } from './product_name.entity';
import { ReadCustomerDto } from './dto/read_customer.dto';
import { UpdateCustomerDto } from './dto/update_customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly _customerRepository: CustomerRepository,
    private readonly _mapperService: MapperService,
  ) {}

  async get(customerId: number): Promise<ReadCustomerDto> {
    if (!customerId) {
      throw new BadRequestException('Id is required');
    }

    const customer: Customer = await this._customerRepository.findOne(
      customerId,
      { where: { status: status.ACTIVE } },
    );

    if (!customer) {
      throw new NotFoundException();
    }

    return plainToInstance(ReadCustomerDto, customer);
  }

  async getAll(): Promise<ReadCustomerDto[]> {
    const customers: Customer[] = await this._customerRepository.find({
      where: { status: status.ACTIVE },
    });

    return customers.map((customer: Customer) =>
      plainToInstance(ReadCustomerDto, customer),
    );
  }

  async create(customer: Customer): Promise<Customer> {
    const savedCustomer: Customer = await this._customerRepository.save(
      customer,
    );

    return savedCustomer;
  }

  async update(
    customerId: number,
    customer: UpdateCustomerDto,
  ): Promise<ReadCustomerDto> {
    const foundedCustomer = await this._customerRepository.findOne(customerId, {
      where: { status: status.ACTIVE },
    });

    if (!foundedCustomer) {
      throw new NotFoundException('Customer not found');
    }

    foundedCustomer.name = customer.name;

    const updatedCustomer = await this._customerRepository.save(
      foundedCustomer,
    );

    return plainToInstance(ReadCustomerDto, updatedCustomer);
  }

  async delete(customerId: number): Promise<ReadCustomerDto> {
    const customerExists = await this._customerRepository.findOne(customerId, {
      where: { status: status.ACTIVE },
    });
    if (!customerExists) {
      throw new NotFoundException();
    }
    await this._customerRepository.update(customerId, {
      status: status.INACTIVE,
    });

    return plainToInstance(ReadCustomerDto, customerExists);
  }
}
