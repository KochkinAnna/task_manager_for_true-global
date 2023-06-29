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

@Module({
  imports: [CategoriesModule, TasksModule, UsersModule],
  controllers: [
    AppController,
    CategoriesController,
    TasksController,
    UsersController,
  ],
  providers: [AppService, CategoriesService, TasksService, UsersService],
})
export class AppModule {}
