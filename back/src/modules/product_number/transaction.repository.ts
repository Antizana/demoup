import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from './product_number.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {}
