import { Module } from '@nestjs/common';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { AccountModule } from './modules/product_i18n/account.module';
import { TransactionModule } from './modules/product_number/transaction.module';
import { CustomerModule } from './modules/product_name/customer.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AccountModule,
    TransactionModule,
    CustomerModule,
  ],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
