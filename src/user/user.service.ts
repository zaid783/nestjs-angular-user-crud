import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager, // EntityManager inject karo
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email;
    const alreadyCreated = await this.userRepository.findOne({ email });

    if (alreadyCreated) {
      throw new ConflictException('User with this email already exists.');
    }

    const user = new User(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );

    // EntityManager use karo persistAndFlush ke liye
    await this.em.persistAndFlush(user);
    
    console.log('Created user with ID:', user.id); // Debug log
    return user;
  }


async delete(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    await this.em.removeAndFlush(user);
    console.log('Deleted user with ID:', userId); // Debug log
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async update(userId: number, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;

    await this.em.persistAndFlush(user);
    console.log('Updated user with ID:', userId); // Debug log
    return user;
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException('User Not Found!');
    }

    return user;
  }
}