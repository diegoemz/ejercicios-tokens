// src/auth/interfaces/request-with-user.interface.ts
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
    name: string;
  };
}
