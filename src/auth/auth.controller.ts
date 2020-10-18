import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserAuthDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('signup')
  signUp(@Body(ValidationPipe) userData: CreateUserDto): Promise<void> {
    return this.authService.signUp(userData)
  }

  @Post('signin')
  signIn(@Body(ValidationPipe) userData: UserAuthDto): Promise<{accessToken: string}> {
    return this.authService.signIn(userData);
  }

}
