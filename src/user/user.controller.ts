import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Res() res, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(res,  createUserDto);
  }

  @Get()
  findAll(@Res() res) {
    return this.userService.findAll(res);
  }

  @Get(':id')
  findOne(@Res() res, @Param('id') id: string) {
    return this.userService.findOne(res, +id);
  }

  @Patch(':id')
  update(@Res() res, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(res, +id, updateUserDto);
  }

  @Delete(':id')
  remove(@Res() res, @Param('id') id: string) {
    return this.userService.remove(res, +id);
  }
}
