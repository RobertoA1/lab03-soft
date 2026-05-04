import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  nombre: string;
  role: string;
}

const USERS: User[] = [
  { id: 1, email: 'agronomo@agrotech.com', nombre: 'Agrónomo Demo', role: 'admin' },
];

const HASHES: Record<string, string> = {
  'agronomo@agrotech.com': bcrypt.hashSync('agrotech2025', 10),
};

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'id'> | null> {
    const hash = HASHES[email];
    if (!hash) return null;
    const ok = await bcrypt.compare(password, hash);
    if (!ok) return null;
    const user = USERS.find((u) => u.email === email);
    if (!user) return null;
    const { id, ...rest } = user;
    return rest;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    const full = USERS.find((u) => u.email === email)!;
    const payload = { sub: full.id, email: full.email, role: full.role };
    return { access_token: this.jwtService.sign(payload), user: full };
  }

  async register(email: string, password: string, nombre: string) {
    if (HASHES[email]) throw new UnauthorizedException('Usuario ya existe');
    const id = USERS.length + 1;
    const user: User = { id, email, nombre, role: 'user' };
    USERS.push(user);
    HASHES[email] = bcrypt.hashSync(password, 10);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload), user };
  }
}
