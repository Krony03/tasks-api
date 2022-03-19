import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_DB_HOST || '0.0.0.0',
  port: Number(process.env.PG_DB_PORT) || 5432,
  username: process.env.PG_DB_USERNAME || 'pguser',
  password: process.env.PG_DB_PASSWORD || 'pgpassword',
  database: process.env.PG_DB_NAME || 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
