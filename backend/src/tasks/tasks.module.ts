import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { Task } from '../common/orm/entities/task.entity';
import { Category } from '../common/orm/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Category])],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
