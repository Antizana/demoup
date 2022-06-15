import { getConnection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Account } from './product_i18n.entity';
import { AccountRepository } from './account.repository';
import { CustomerRepository } from '../product_name/customer.repository';
import { TransactionRepository } from '../product_number/transaction.repository';
import { Transaction } from '../product_number/product_number.entity';
import { ReadAccountDto } from './dto/read_account.dto';
import { plainToInstance } from 'class-transformer';
import { Customer } from '../product_name/product_name.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountRepository)
    private readonly _accountRepository: AccountRepository,
    @InjectRepository(CustomerRepository)
    private readonly _customerRepository: CustomerRepository,
    @InjectRepository(TransactionRepository)
    private readonly _transactionRepository: TransactionRepository,
  ) {}

  async getCustomerAccounts(customerId: number): Promise<ReadAccountDto[]> {
    if (!customerId) {
      throw new Error('Customer id is required');
    }

    const accounts: Account[] = await this._accountRepository.find({
      where: { customerId: customerId },
    });

    if (!accounts) {
      throw new Error('Accounts not found');
    }

    return accounts.map((account: Account) =>
      plainToInstance(ReadAccountDto, account),
    );
  }

  async getAll(): Promise<ReadAccountDto[]> {
    const accounts: Account[] = await this._accountRepository.find({
      relations: ['transactions'],
    });

    return accounts.map((account: Account) =>
      plainToInstance(ReadAccountDto, account),
    );
  }

  async createAccount(account: InitAccount): Promise<ReadAccountDto> {
    if (account.initialCredit < 0) {
      throw new Error('Initial credit must be greater than 0');
    }

    const customer = await this._customerRepository.findOne(account.customerId);

    if (!customer) {
      throw new Error('Customer not found');
    }

    let savedAccount = {} as Account;
    if (account.initialCredit >= 0) {
      savedAccount = await createNewAccount(account, customer);
    }

    return plainToInstance(ReadAccountDto, savedAccount);

    async function createNewAccount(account: InitAccount, customer: Customer) {
      const connection = getConnection();
      const queryRunner = connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const newAccount = new Account();
        newAccount.initialCredit = account.initialCredit;
        newAccount.customer = customer;
        newAccount.balance = account.initialCredit;
        await queryRunner.manager.save(Account, newAccount);

        if (account.initialCredit == 0) {
          await queryRunner.commitTransaction();
          return newAccount;
        }

        const newTransaction = new Transaction();
        newTransaction.account = newAccount;
        newTransaction.amount = account.initialCredit;
        newTransaction.type = 'credit';
        await queryRunner.manager.save(newTransaction);

        await queryRunner.commitTransaction();

        return newAccount;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    }
  }
}
