import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db.bwpcmajzvqesrlyiiylh.supabase.co',
  port: 5432,
  username: 'postgres',
  password: 'Q*9wwqF%WDfV',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
