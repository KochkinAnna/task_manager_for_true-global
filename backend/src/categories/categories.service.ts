import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../common/orm/entities/category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { EditCategoryDto } from './dto/editCategory.dto';
import { validate } from 'class-validator';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new Category();
    category.name = createCategoryDto.name;

    const errors = await validate(category);
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return this.categoryRepository.save(category);
  }

  async getList(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getItem(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async edit(
    id: number,
    editCategoryDto: EditCategoryDto,
  ): Promise<Category | null> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = editCategoryDto.name;

    const errors = await validate(category);
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return this.categoryRepository.save(category);
  }
}
