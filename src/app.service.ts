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

  //ref userEntity

  public async  update(userData: UserEntity): Promise <void> {

    const {id, name, email, phone, password} = userData
    const user = await this.find(id)
     
    user.name = name ? name : user.name
    user.phone = phone ? phone : user.phone
    user.email = email ? email : user.email
    user.password = password ? password : user.password

    await this.userRepository.save(user)


}
public async  list(): Promise <UserEntity[]> {
      return await this.userRepository.find()
  }

  public async  find(userId: number): Promise <User> {
    const {id,name, email, password, phone} = await this.userRepository.findOne({where: {}});
    const response: User = {id, name, email, password, phone}
    return response
}

public async  delete(id: number): Promise <void> {
await this.userRepository.delete({id})}

public async  activate(id: number): Promise <void> {
  await this.userRepository.update(id,{status: 'ACTIVATE'})}

  public async  inactivate(id: number): Promise <void> {
    await this.userRepository.update(id,{status: 'INACTIVATE'})}

}
