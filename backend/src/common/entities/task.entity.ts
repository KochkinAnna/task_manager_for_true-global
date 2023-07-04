import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Category } from './category.entity';
import { IsNotEmpty, IsString, IsDate, IsInt, Length } from 'class-validator';

@Entity()
@ApiTags('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the task (auto-incremented)',
  })
  @IsNotEmpty({ message: 'Task id cannot be empty' })
  @IsInt({ message: 'Task id is int' })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Complete project report',
    description: 'Name of the task',
  })
  @IsString({ message: 'Task name must be a string' })
  @Length(2, 50, {
    message:
      'Task name must contain a minimum of 2 letters and a maximum of 50',
  })
  @IsNotEmpty({ message: 'Task name cannot be empty' })
  name: string;

  @Column()
  @ApiProperty({
    example: '2023-07-04',
    description: 'Date when the task starts',
  })
  @IsDate({ message: 'Invalid date format' })
  dateStart: Date;

  @Column()
  @ApiProperty({
    example: '2023-07-10',
    description: 'Date when the task ends',
  })
  @IsDate({ message: 'Invalid date format' })
  dateEnd: Date;

  @ManyToOne(() => Category, (category) => category.tasks)
  @ApiProperty({
    type: () => Category,
    description: 'Category to which the task belongs',
  })
  category: Category;
}
