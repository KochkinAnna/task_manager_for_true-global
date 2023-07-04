import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesService } from './categories/categories.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './common/entities/user.entity';
import { Category } from './common/entities/category.entity';
import { Task } from './common/entities/task.entity';

@Module({
  imports: [
    CategoriesModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'tasks_manager_for_true_global',
      entities: [User, Category, Task],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [
    AppController,
    CategoriesController,
    TasksController,
    UsersController,
  ],
  providers: [AppService, CategoriesService, TasksService, UsersService],
})
export class AppModule {}
