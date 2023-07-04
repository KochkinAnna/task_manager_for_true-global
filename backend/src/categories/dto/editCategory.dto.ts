import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditCategoryDto {
  @ApiProperty({
    name: 'name',
    required: true,
    example: 'Work',
    description: 'The name of category',
  })
  @IsOptional()
  @IsString({ message: 'Category name must be a string' })
  name?: string;
}
