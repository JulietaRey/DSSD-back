import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto, UserAuthDto } from './user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userData: CreateUserDto): Promise<void> {
    const user = new User();

    const salt = await bcrypt.genSalt();
    userData.password = await this.hashPassword(userData.password, salt);
    Object.assign(user, userData, { salt });
    try {
      await user.save();
    } catch (error) {
      // TODO: build error constants file
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(userData: UserAuthDto): Promise<boolean> {
    const { username, password } = userData;
    const user = await this.findOne({ username });
    return (user && user.validatePassword(password)) || false;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
