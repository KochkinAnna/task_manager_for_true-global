import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Category } from './category.entity';
import { IsEmail, IsNotEmpty, IsInt, Length } from 'class-validator';

@Entity()
@ApiTags('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the user (auto-incremented)',
  })
  @IsNotEmpty({ message: 'User id cannot be empty' })
  @IsInt({ message: 'User id is int' })
  id: number;

  @Column()
  @ApiProperty({
    example: 'test@example.com',
    description: 'Email address of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @Column()
  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsNotEmpty({ message: 'Password field cannot be empty' })
  @Length(4, 10, {
    message: 'Password must contain a minimum of 4 symbols and a maximum of 10',
  })
  password: string;

  @OneToMany(() => Category, (category) => category.user)
  @ApiProperty({
    type: () => Category,
    isArray: true,
    description: 'Categories created by the user',
  })
  categories: Category[];
}
