import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || dbConfig.host,
  port: +process.env.DATABASE_PORT || 5432,
  password: process.env.DATABASE_PASSWORD || dbConfig.password,
  username: process.env.DATABASE_USER 
    || dbConfig.username,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}