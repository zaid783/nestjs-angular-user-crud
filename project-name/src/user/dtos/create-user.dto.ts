import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {

@ApiProperty({
  description: 'The name of the user',
  example: 'Zaid Ahmed'
})

  @IsNotEmpty()
  @IsString()
  name: string;


@ApiProperty({
  description: 'The email of the user',
  example: 'Zaidlaiq99@gmail.com'
})
  @IsNotEmpty()
  @IsString()
  email: string;


@ApiProperty({
  description: 'The password of the user',
  example: 'ZaidAhmed1915'
})

  @IsNotEmpty()
  @IsString()
  password: string;

}