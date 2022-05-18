import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public readUsers() {
    return this.usersService.getUsers();
  }
  @Post()
  public createUser(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }
}
