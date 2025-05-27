import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  validateUser(email: string, password: string) {
    if (email == 'admin@api.com' && password == '1234') {
      return { id: 1, email, name: 'Admin' };
    }
    return null;
  }

  login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name || user.nombre,
    };
    return {
      acces_token: this.jwtService.sign(payload),
    };
  }
}