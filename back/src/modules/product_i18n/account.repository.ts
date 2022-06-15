import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Account } from './product_i18n.entity';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {}
