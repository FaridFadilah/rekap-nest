import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from 'src/dto/user.dto';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  getUsers(){
    return this.userRepository
  }

  async updateUser(userId: number, request: CreateUserDto){
    const userExist = await this.userRepository.findOne({
      where:{
        id: userId
      }
    })
    if(!userExist){
      throw new BadRequestException("Data user tidak ditemukan")
    }

    // Login Update
    userExist.email = request.email
    userExist.username = request.username
    userExist.password = request.password

    await this.userRepository.update(userId, userExist )
    // return this.userRepository.createQueryBuilder().update(userExist).where("id = :userid", {user: userId}).getQuery()
  }

  createUser(validator: CreateUserDto){
    const newUser = this.userRepository.create(validator)
    return this.userRepository.save(newUser)
  }

  findUser(id:number){
    return this.userRepository.findOne({where:{id}})
  }
}
