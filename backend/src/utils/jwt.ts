import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "../config/env";

export class Jwt {
  static sign(payload: object): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
  }

  static verify(token: string): JwtPayload | string {
    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}
