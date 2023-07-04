import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { IsNotEmpty, IsString, IsDate, IsInt, Length } from 'class-validator';
import { Task } from './task.entity';

@Entity()
@ApiTags('categories')
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the category (auto-incremented)',
  })
  @IsNotEmpty({ message: 'Category id cannot be empty' })
  @IsInt({ message: 'Category id is int' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Work', description: 'Name of the category' })
  @IsString({ message: 'Category name must be a string' })
  @Length(2, 50, {
    message:
      'Category name must contain a minimum of 2 letters and a maximum of 50',
  })
  @IsNotEmpty({ message: 'Category name cannot be empty' })
  name: string;

  @Column()
  @ApiProperty({
    example: '2023-07-04T12:00:00Z',
    description: 'Date when the category was created',
  })
  @IsDate({ message: 'Invalid date format' })
  dateCreated: Date;

  @ManyToOne(() => User, (user) => user.categories)
  @ApiProperty({
    type: () => User,
    description: 'User who created the category',
  })
  user: User;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
