import {
    IsString,
    IsNotEmpty,
    IsEmail,
    Length,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/models/roles.model';

  
  export class CreateUserDto {
    @IsString()
    @IsEmail()
    @ApiProperty({ description: 'the email of user' })
    readonly email: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(6)
    @ApiProperty()
    readonly password: string;
  
    @IsNotEmpty()
    @ApiProperty({ enum: Role })
    readonly role: Role;
  
  }
  