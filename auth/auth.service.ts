import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.findOne({ email });
    if (user) {
      const correct = await bcrypt.compare(password, user?.password);
      if (correct) return user;
    }
    else return null;
  }

  async login(user: User) {
    const { email, id } = user;
    const payload = { email, id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
