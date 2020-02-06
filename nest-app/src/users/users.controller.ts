import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Res,
  HttpStatus,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Response } from 'express';
import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  Matches
} from 'class-validator';

import { IUser, IUserSearch } from './users.model';
import { UsersService } from './users.service';
import { NotFoundInterceptor } from '../utils/not-found.interceptor';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Matches(new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{2,}$'))
  password: string;

  @IsInt()
  @Min(4)
  @Max(130)
  @IsNotEmpty()
  age: number;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async find(@Param('id') id: string): Promise<IUser> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.createUser(userDto);
    res.location(`/users/${user.id}`);
    res.status(HttpStatus.CREATED).json(user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(NotFoundInterceptor)
  async update(@Param('id') id: string, @Body() userDto: CreateUserDto) {
    return this.usersService.updateUserById(id, userDto);
  }

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async findAll(@Query() query: IUserSearch): Promise<IUser[]> {
    const { loginSubstring = '', limit = 10 } = query;
    return this.usersService.getUsers(loginSubstring, limit);
  }

  @Delete(':id')
  @UseInterceptors(NotFoundInterceptor)
  async remove(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
