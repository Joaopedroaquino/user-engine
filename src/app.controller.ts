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

 @MessagePattern('find-user')
  async find(@Payload() data: any): Promise<User> {
     return await this.appService.find(Number(data.value.id))
 }

 @MessagePattern('create-user')
  async create(@Payload() data: User): Promise<UserEntity> {
    this.logger.log(`User: ${JSON.stringify(data)} `)
     return await this.appService.create(data)
 }

 @MessagePattern('update-user')
 async update(@Payload() data: any): Promise<void> {
   this.logger.log(`User: ${JSON.stringify(data)} `)
     await this.appService.update(data)
}

@MessagePattern('delete-user')
  async remove(@Payload() data: any): Promise<void> {
     return await this.appService.delete(Number(data.value.id))
 }

}
