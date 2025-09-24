//API CREATING ENDPOINTS FOR USER 


import { Controller, Post, Body, Get, Delete, Put, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { CreateUserDto } from './dtos/create-user.dto';
import { FileUploadDto } from './dtos/file-upload.dto';
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
          password: 'ZaidAhmed1915',
          uploadedFiles: []
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
    return await this.userService.update(userId, updateUserDto);
  }

  @Post('upload/:userId')
  @ApiOperation({ description: 'Upload multiple files for a user' })
  @ApiParam({ name: 'userId', description: 'User ID to upload files for' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Files to upload',
    type: FileUploadDto,
  })



  @ApiOkResponse({ type: User, description: 'User with uploaded files' })
  @UseInterceptors(FilesInterceptor('files', 5, {
    storage: diskStorage({
      destination: './uploads',  // Creates uploads folder in project root
      filename: (req, file, cb) => {
       
        cb(null, Date.now() + extname(file.originalname));
      },
    }),
  }))



  async uploadFiles(
    @Param('userId') userId: number,
    @UploadedFiles() files: Array<Express.Multer.File>
  ): Promise<User> {
    return await this.userService.uploadFiles(userId, files);
  }
}