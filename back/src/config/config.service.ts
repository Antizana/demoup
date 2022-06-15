import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnvironment = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnvironment) {
      const envFilePath = `${__dirname}/../../.env`;
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        throw new Error(`The .env file doesn't exist at ${envFilePath}`);
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }
  get(key: string): string {
    return this.envConfig[key];
  }
}
