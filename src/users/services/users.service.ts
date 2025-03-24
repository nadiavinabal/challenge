import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(User) private userRepository: Repository<User>) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
      }

    findByEmail(email: string) {
        const user = this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException(`User #${email} not found`);
          }
          return user;
    }

    async create(data: CreateUserDto) {
      const newUser = this.userRepository.create(data);
      const hashPassword = await bcrypt.hash(newUser.password, 10); // numeero de iteraciones 10 saltos.
      newUser.password = hashPassword;
      return this.userRepository.save(newUser);
    }
}