import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './config/postgres.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: postgresConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    // TODO adding task module
    // TODO adding user module
    // TODO adding auth module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
