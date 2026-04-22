import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return plainToInstance(UserResponseDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users (active)' })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  async findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    const users = await this.usersService.findAll({ skip, take });
    return plainToInstance(UserResponseDto, users);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return plainToInstance(UserResponseDto, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return plainToInstance(UserResponseDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete user' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    return plainToInstance(UserResponseDto, user);
  }
}
