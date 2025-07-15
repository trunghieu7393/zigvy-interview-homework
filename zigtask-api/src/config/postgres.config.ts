import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// TODO create entities for User and Task

export const postgresConfig = (config: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: Number(config.get<string>('DB_PORT')) || 5432,
    username: config.get<string>('DB_USERNAME') || 'postgres',
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    // TODO: define entities here
    //entities: [User, Task],
    synchronize: config.get<string>('NODE_ENV') === 'production' ? false : true,
  };
};
