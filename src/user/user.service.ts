import { User } from './entities/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
config();

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.isEmailConfirmed = createUserDto.isEmailConfirmed;
    user.isCookiesConfirmed = createUserDto.isCookiesConfirmed;
    user.password = createUserDto.password;
    await user.save();

    const savedUser = await user.save();

    return {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      isEmailConfirmed: savedUser.isEmailConfirmed,
      isCookiesConfirmed: savedUser.isCookiesConfirmed,
    } as unknown as User;
  }

  async findByUsername(username: string): Promise<User> {
    return User.findOne({ where: { username } });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    Object.assign(user, updateUserDto);
    return User.save(user);
  }

  async updateEmailConfirmationStatus(id: number): Promise<User> {
    const user = await this.getUserById(id);
    user.isEmailConfirmed = true;
    return User.save(user);
  }

  async getUserByConfirmationToken(access_token: string): Promise<User> {
    try {
      const decodedToken = this.jwtService.verify(access_token, {
        secret: `${process.env.APP_SECRET}`,
      }) as any;
      const user = await User.findOne({ where: { id: decodedToken.id } });
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid token');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async generateToken(user: User): Promise<any> {
    const { id, username, email, isEmailConfirmed, isCookiesConfirmed } = user;
    const payload = {
      id,
      username,
      email,
      isEmailConfirmed,
      isCookiesConfirmed,
    };
    const access_token = this.jwtService.sign(payload);
    return { access_token, ...payload };
  }
}
