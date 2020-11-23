import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto, UserAuthDto } from './user.dto';
import { Member } from 'src/project/member.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userData: CreateUserDto): Promise<void> {
    const user = new User();

    const salt = await bcrypt.genSalt();
    userData.password = await this.hashPassword(userData.password, salt);
    Object.assign(user, userData, { salt });
    try {
      await user.save();
      const member = new Member();
      Object.assign(member, {
        id: user.id,
        nombre: `${user.firstName} ${user.lastName}`,
      });
      await member.save();
    } catch (error) {
      // TODO: build error constants file
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(userData: UserAuthDto): Promise<false | {userId: number}> {
    const { username, password } = userData;
    const user = await this.findOne({ username });
    if (user && user.validatePassword(password)) {
      return {
        userId: user.id
      }
    }
    return false;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
