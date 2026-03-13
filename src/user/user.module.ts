import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],              // ← register the service so DI works
  exports: [UserService],               // allow other modules to consume it
})
export class UserModule {}
