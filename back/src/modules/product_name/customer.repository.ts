import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Customer } from './product_name.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {}
