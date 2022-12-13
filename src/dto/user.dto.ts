import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export default class CreateUserDto{
  @IsNotEmpty()
  @MinLength(3)
  username: string

  @IsNotEmpty()
  @MinLength(8)
  password: string

  @IsNotEmpty()
  @IsEmail()
  email: string
}