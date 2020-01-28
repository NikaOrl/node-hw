import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete
} from '@nestjs/common';
import { IUser } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async find(@Param('id') id): Promise<IUser> {
    return this.usersService.getUserById(id);
  }

  @Post()
  async create(@Body() userDto: IUser) {
    return this.usersService.createUser(userDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: IUser) {
    return this.usersService.updateUserById(id, userDto);
  }

  @Get()
  async findAll(@Query() query): Promise<IUser[]> {
    const { loginSubstring = '', limit = 10 } = query;
    return this.usersService.getUsers(loginSubstring, limit);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
