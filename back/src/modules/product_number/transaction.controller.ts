import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReadTransactionDto } from './dto/read_transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly _transactionService: TransactionService) {}

  @Get(':transactionId')
  getTransaction(
    @Param('transactionId', ParseIntPipe) transactionId: number,
  ): Promise<ReadTransactionDto> {
    const transaction = this._transactionService.get(transactionId);
    return transaction;
  }

  @Get('account_transactions/:accountId')
  getAccountTransaction(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Promise<ReadTransactionDto[]> {
    const transaction =
      this._transactionService.getAccountTransaction(accountId);
    return transaction;
  }

  @Get()
  async getAllTransactions(): Promise<ReadTransactionDto[]> {
    const transactions = await this._transactionService.getAll();
    return transactions;
  }
}
