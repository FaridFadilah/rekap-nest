import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import entities from 'src'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ENV: ConfigService) => ({
        type: 'postgres',
        host: ENV.get("DB_HOST"),
        port: ENV.get<number>("DB_PORT"),
        username: ENV.get('DB_USERNAME'),
        password: ENV.get('DB_PASSWORD'),
        database: ENV.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
