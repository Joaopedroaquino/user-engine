import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserEntity } from './interfaces/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private logger = new Logger(AppController.name)

  @MessagePattern('find-all-user')
  async list(): Promise<UserEntity[]> {
     return await this.appService.list()
 }

 @MessagePattern('create-user')
  async create(@Payload() data: any): Promise<UserEntity> {
     return await this.appService.create(data)
 }

}
