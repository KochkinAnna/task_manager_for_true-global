import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesService } from './categories/categories.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './common/orm/entities/user.entity';
import { Category } from './common/orm/entities/category.entity';
import { Task } from './common/orm/entities/task.entity';
import { CategoriesResolver } from './categories/categories.resolver';
import { TasksResolver } from './tasks/tasks.resolver';
import { UsersResolver } from './users/users.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { upperDirectiveTransformer } from './common/orm/derictives/upper-case.directive';
import { GraphQLDirective } from 'graphql/type';
import { DirectiveLocation } from 'graphql/language';

@Module({
  imports: [
    CategoriesModule,
    TasksModule,
    UsersModule,
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CategoriesService,
    TasksService,
    UsersService,
    CategoriesResolver,
    TasksResolver,
    UsersResolver,
  ],
})
export class AppModule {}
