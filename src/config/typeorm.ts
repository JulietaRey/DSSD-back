import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: dbConfig.host,
  port: 3306,
  password: dbConfig.password,
  username: dbConfig.username,
  database: dbConfig.schema,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}