import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserEntity } from './interfaces/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private logger = new Logger(AppController.name)

  @MessagePattern('find-all-user')
  async list(): Promise<UserEntity[]> {
     return this.appService.list()
 }

  create(): string {
     return  
 }

}
