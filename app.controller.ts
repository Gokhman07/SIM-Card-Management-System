import { Controller, Get, Request, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';


@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(AuthGuard('local'))
  @Post('auth/login')
   async login(@Body() user) {
	   console.log(user.email)
    return this.authService.login(user);
  }
}
