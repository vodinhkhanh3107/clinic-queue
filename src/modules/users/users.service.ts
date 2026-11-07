import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../models/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    getUser() {
        return this.userRepository.find();
    }

}
