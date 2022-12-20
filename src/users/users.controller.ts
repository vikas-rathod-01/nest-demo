import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { requestObj } from './dto/userDTO';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  @UseGuards(AuthGuard)
  async getUser(@Body() data: requestObj) {
    return await this.userService.createUser(
      data.name,
      data.email,
      data.password,
    );
  }
}
