import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ user: User; token: string }> {
    const { email, password, firstName, lastName } = signUpDto;

    try {
      // Check if user already exists
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        this.logger.warn(`Signup attempt with existing email: ${email}`);
        throw new ConflictException('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await this.userService.create({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = this.jwtService.sign({ userId: user.id, email: user.email });

      this.logger.log(`User successfully registered: ${user.id}`);
      return { user, token };
    } catch (error) {
      this.logger.error(`Signup failed for email ${email}:`, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ user: User; token: string }> {
    const { email, password } = signInDto;

    try {
      // Find user
      const user = await this.userService.findByEmail(email);
      if (!user) {
        this.logger.warn(`Signin attempt with non-existent email: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Invalid password attempt for user: ${user.id}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT token
      const token = this.jwtService.sign({ userId: user.id, email: user.email });

      this.logger.log(`User successfully signed in: ${user.id}`);
      return { user, token };
    } catch (error) {
      this.logger.error(`Signin failed for email ${email}:`, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async validateUser(userId: string): Promise<User> {
    try {
      const user = await this.userService.findById(userId);
      if (!user) {
        this.logger.warn(`Token validation failed - user not found: ${userId}`);
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`User validation failed for userId ${userId}:`, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }
}
