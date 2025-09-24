/* eslint-disable @typescript-eslint/naming-convention */
import { Property, Entity, Unique, PrimaryKey } from '@mikro-orm/core';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  @Unique()
  @IsEmail()
  email: string;

  @Property()
  password: string;

  @Property({ type: 'json', nullable: true })
  files?: string[];

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(
    name: string,
    email: string,
    password: string,
    
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}