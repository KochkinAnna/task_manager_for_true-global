import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../common/orm/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { EditUserDto } from "./dto/editUser.dto";

@ApiTags('users')
@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiBody({ type: CreateUserDto })
  @Mutation()
  async create(@Args('input') createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieved user list successfully',
    type: [User],
  })
  @Query()
  async getList(): Promise<User[]> {
    return this.usersService.getList();
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieved user successfully',
    type: User,
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  @Query()
  async getItem(@Args('id') id: number): Promise<User> {
    return this.usersService.getItem(id);
  }

  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @Mutation()
  async delete(@Args('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }

  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: EditUserDto })
  @Mutation()
  async edit(
    @Args('id') id: number,
    @Args('input') editUserDto: EditUserDto,
  ): Promise<User> {
    return this.usersService.edit(id, editUserDto);
  }
}
