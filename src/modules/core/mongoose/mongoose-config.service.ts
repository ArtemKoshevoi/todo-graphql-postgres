import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const host = this.config.get('MONGODB_HOST');
    const port = this.config.get('MONGODB_PORT');
    const dbName = this.config.get('MONGODB_DBNAME');

    return {
      uri: `mongodb://${host}:${port}/${dbName}`,
      user: this.config.get('MONGODB_USER'),
      pass: this.config.get('MONGODB_PASS'),
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    };
  }
}
