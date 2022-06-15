import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { plainToInstance } from 'class-transformer';
import { ReadTransactionDto } from './dto/read_transaction.dto';
import { Transaction } from './product_number.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private readonly _transactionRepository: TransactionRepository,
  ) {}

  async get(transactionId: number): Promise<ReadTransactionDto> {
    const transaction = await this._transactionRepository.findOne(
      transactionId,
    );
    return plainToInstance(ReadTransactionDto, transaction);
  }

  async getAccountTransaction(
    accountId: number,
  ): Promise<ReadTransactionDto[]> {
    if (!accountId) {
      throw new Error('Account id is required');
    }
    const transactions: Transaction[] = await this._transactionRepository.find({
      where: { accountId: accountId },
    });

    if (!transactions) {
      throw new Error('Transactions not found');
    }

    return transactions.map((transaction: Transaction) =>
      plainToInstance(ReadTransactionDto, transaction),
    );
  }

  async getAll(): Promise<ReadTransactionDto[]> {
    const transactions = await this._transactionRepository.find();
    return plainToInstance(ReadTransactionDto, transactions);
  }
}
