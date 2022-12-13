import { Module } from '@nestjs/common'
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from 'src/Entities/user.entity'
import { UsersController } from './controller/users.controller'
import { UsersService } from './service/users.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[TypeOrmModule.forFeature([User])]
})

export class UsersModule {}