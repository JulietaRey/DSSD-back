import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';
import { CreateUserDto, UserAuthDto, JwtPayload } from './user.dto';
import { BonitaRepository } from './bonita.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
    private bonitaRepository: BonitaRepository,
  ) {}

  async signUp(userData: CreateUserDto) {
    return this.userRepository.signUp(userData);
  }

  async signIn(userData: UserAuthDto): Promise<{ accessToken: string, bonitaToken: string, JSESSIONID: string }> {
    const success = await this.userRepository.signIn(userData);
    if (!success) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { username: userData.username };
    const accessToken = await this.jwtService.sign(payload);
    const bonitaResponse = await this.bonitaRepository.signIn();
    const bonitaToken = bonitaResponse.bonitaToken;
    const JSESSIONID = bonitaResponse.JSESSIONID;
    return { accessToken, bonitaToken, JSESSIONID };
  }
}
