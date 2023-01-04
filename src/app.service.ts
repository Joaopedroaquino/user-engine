import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './interfaces/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class AppService {
  constructor(@InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>){}

public async  create(user: User): Promise <UserEntity> {
     
      return  await this.userRepository.save(user)
  }

public async  list(): Promise <UserEntity[]> {
      return await this.userRepository.find()
  }

  public async  find(userId: number): Promise <User> {
    const {id,name, email, password, phone} = await this.userRepository.findOne({where: {}});
    const response: User = {id, name, email, password, phone}
    return response
}

}
