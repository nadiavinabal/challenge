import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    create(@Body() payload: CreateUserDto) {
      return this.usersService.create(payload);
    }
}