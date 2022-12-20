import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDTO } from './dto/userDTO';
// import { UserDetails } from './interface/user-details.interface';
// import { UserDetails } from './interfaces/user-details.interface';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<userDTO>,
  ) {}

  // async findById(id: string): Promise<UserDetails> {
  //   const user = await this.userModel.findById(id).exec();
  //   if (!user) throw new NotFoundException('User not found');
  //   return this._getUserDetials(user);
  // }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<UserDocument | string> {
    const isAvailable = await this.findByEmail(email);
    if (isAvailable)
      throw new HttpException(
        { status: HttpStatus.ACCEPTED, error: 'USER ALREADY EXIST' },
        HttpStatus.ACCEPTED,
      );
    const newUser = new this.userModel({ name, email, password });
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }
}
