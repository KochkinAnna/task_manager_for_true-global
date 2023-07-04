import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { EUserRoles } from "../../common/enums/userRoles.enum";

export class EditUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'newPassword123',
    description: 'Password of the user',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    example: EUserRoles.user,
    description: 'Role of the user',
  })
  @IsOptional()
  @IsString({ message: 'Role must be a string' })
  role?: EUserRoles;
}
