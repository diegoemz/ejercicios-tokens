import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  async login(credentials: { email: string; password: string }) {
    const user = await this.validateUser(credentials.email, credentials.password);
    if (!user) throw new UnauthorizedException();

    const payload = {
      email: user.email,
      sub: user.id,
      name: user.nombre || user.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
