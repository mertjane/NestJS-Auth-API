import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ description: 'Primary Key as user ID', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Unique username', example: 'jhonDoe' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: 'User Email', example: 'jhondoe@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Hashed Password', example: '********' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Email Confirmation', example: false })
  @Column({ default: false })
  isEmailConfirmed: boolean;

  @ApiProperty({ description: 'Cookies', example: false })
  @Column({ default: false })
  isCookiesConfirmed: boolean;

  @ApiProperty({ description: 'When User was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When User was updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
