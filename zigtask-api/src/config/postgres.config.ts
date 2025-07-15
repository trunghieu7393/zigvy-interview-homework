import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';


export const postgresConfig = (config: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: Number(config.get<string>('DB_PORT')) || 5432,
    username: config.get<string>('DB_USERNAME') || 'postgres',
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    entities: [User, Task],
    synchronize: config.get<string>('NODE_ENV') === 'production' ? false : true,
  };
};
