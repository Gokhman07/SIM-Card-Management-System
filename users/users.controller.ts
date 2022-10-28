import { Body, Controller, Get, Req, UseGuards, Request } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { IdInterceptor } from './interceptors/id.interceptor';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: User,
  },
  query: {
    allow: ['id', 'name', 'email', 'role','password'],
  },
  routes: {
    only: ['createOneBase', 'getManyBase', 'updateOneBase', 'getOneBase'],
    createOneBase: {
      interceptors: [IdInterceptor],
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) { }

  get base(): CrudController<User> {
    return this;
  }

  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: User) {
    console.log(dto.password);
    return this.base.createOneBase(req, {
      ...dto,
      password: bcrypt.hashSync(dto.password, 10),
    });
  }

  // @Query(returns => User)
  // @UseGuards(GqlAuthGuard)
  // whoAmI(@CurrentUser() user: User) {
  //   return this.usersService.findById(user.id);
  // }


  @Override()
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: User) {
    const data = { ...dto };
    if (data.password) {
      data.password = bcrypt.hashSync(dto.password, 10);
    }
    return this.base.updateOneBase(req, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.service.getUserByEmail(req);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
  }

}

