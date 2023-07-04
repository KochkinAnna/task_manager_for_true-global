import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    name: 'name',
    required: true,
    example: 'Work',
    description: 'The name of category',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
