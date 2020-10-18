import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';
import { CreateUserDto, UserAuthDto, JwtPayload } from './user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userData: CreateUserDto) {
    return this.userRepository.signUp(userData);
  }

  async signIn(userData: UserAuthDto): Promise<{ accessToken: string }> {
    const success = await this.userRepository.signIn(userData);
    if (!success) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { username: userData.username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
