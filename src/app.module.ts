import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './users/middleware/authMiddleware';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { UserController } from './users/users.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    UsersModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // .exclude({
      //   path: 'user/createUser',
      //   method: RequestMethod.POST,
      // }); //apply Middleware to particular Path and  Method
      // .forRoutes({
      //  path: 'user/createUser',
      //  method: RequestMethod.POST });             //apply Middleware to particular Path and  Method
      // .forRoutes('user');                         //apply Middleware to routes starts with user
      .forRoutes(UserController); //apply Middleware to Controllers
    // .forRoutes({ path: 'a*z', method: RequestMethod.ALL }); //apply middleware to all routes which starts with 'a' and ends with 'z'
  }
}
