import { Controller, Post, Body, Get,Delete, Put,Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBody} from '@nestjs/swagger';


import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
 @ApiOperation({ description: 'List of all users' })
  @ApiOkResponse({ type: User, isArray: true })
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':userId')
  @ApiOkResponse({ type: User })
  async getUser(@Param('userId') userId: number): Promise<User> {
    return await this.userService.getUser(userId);
  }

  @Post()
  @ApiBody({
    type: CreateUserDto,
    examples: {
      user1: {
        value: {
          name: 'Zaid Ahmed',
          email: 'Zaid Ahmed@example.com',
          password: 'ZaidAhmed1915'
        }
      }
    }
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
@Delete(':userId')
async delete(@Param('userId') userId: number): Promise<void> {
  return await this.userService.delete(userId);
}

@Put(':userId')
async update(@Param('userId') userId: number, @Body() updateUserDto: CreateUserDto): Promise<User> {
  // Update logic to be implemented in the service
  return await this.userService.update(userId, updateUserDto);
}
}