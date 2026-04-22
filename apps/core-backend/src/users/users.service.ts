import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async create(dto: CreateUserDto) {
    const existing = await this.repository.findByEmail(dto.email);
    if (existing) throw new BadRequestException('Email already exists');

    const { password, ...data } = dto;
    const passwordHash = await bcrypt.hash(password, 10);

    return this.repository.create({
      ...data,
      passwordHash,
    });
  }

  async findAll(query: { skip?: number; take?: number }) {
    return this.repository.findAll(
      query.skip ? Number(query.skip) : undefined,
      query.take ? Number(query.take) : undefined,
    );
  }

  async findOne(id: string) {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id); // Check existence

    const { password, ...data } = dto;
    const updateData: any = { ...data };

    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    return this.repository.update(id, updateData);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
