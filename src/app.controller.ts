import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserEntity } from './interfaces/user.entity';
import { User } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private logger = new Logger(AppController.name)

  @MessagePattern('find-all-user')
  async list(): Promise<UserEntity[]> {
     return await this.appService.list()
 }

 @MessagePattern('create-user')
  async create(@Payload() data: User): Promise<UserEntity> {
    this.logger.log(`User: ${JSON.stringify(data)} `)
     return await this.appService.create(data)
 }

}
