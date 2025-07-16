import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Plan } from 'src/constants/types';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: Number(id) } });
  }

  // async upgradeToPremium(id: string): Promise<User> {
  //   const user = await this.findById(id);
  //   if (!user) {
  //     this.logger.warn(`Signin attempt with non-existent email: ${email}`);
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   user.plan = Plan.PREMIUM;
  //   user.upgradedAt = new Date();

  //   return this.userRepository.save(user);
  // }
}
