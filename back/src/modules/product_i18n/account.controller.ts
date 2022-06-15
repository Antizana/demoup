import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { ReadAccountDto } from './dto/read_account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly _accountService: AccountService) {}

  @Get('customer_accounts/:customerId')
  async getCustomerAccounts(
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<ReadAccountDto[]> {
    const accounts = await this._accountService.getCustomerAccounts(customerId);
    return accounts;
  }

  @Get()
  async getAllAccount(): Promise<ReadAccountDto[]> {
    const accounts = await this._accountService.getAll();
    return accounts;
  }

  @Post()
  async createAccount(
    @Body() initialAccount: InitAccount,
  ): Promise<ReadAccountDto> {
    const createdAccount = await this._accountService.createAccount(
      initialAccount,
    );
    return createdAccount;
  }
}
