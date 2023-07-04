import { Module } from '@nestjs/common';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../common/orm/entities/category.entity';
import { Task } from '../common/orm/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Task])],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
