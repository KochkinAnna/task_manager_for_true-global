import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/orm/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';
import { EUserRoles } from '../common/enums/userRoles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = createUserDto.role;

    return this.userRepository.save(user);
  }

  async getList(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getItem(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);
  }

  async edit(id: number, editUserDto: EditUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (editUserDto.email) {
      user.email = editUserDto.email;
    }

    if (editUserDto.password) {
      user.password = editUserDto.password;
    }

    if (
      editUserDto.role &&
      Object.values(EUserRoles).includes(editUserDto.role)
    ) {
      user.role = editUserDto.role;
    }

    return this.userRepository.save(user);
  }
}
