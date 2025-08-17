import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { UserService, BrandService } from "./db/service"
import type { User, Brand } from "./db/schema"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key"
export interface JWTPayload {
  id: string
  email: string
  role: string
  type: "user" | "brand"
}

export interface RefreshTokenPayload {
  id: string
  type: "user" | "brand"
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
  }

  static generateRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" })
  }

  static verifyAccessToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload
    } catch (error) {
      return null
    }
  }

  static verifyRefreshToken(token: string): RefreshTokenPayload | null {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET) as RefreshTokenPayload
    } catch (error) {
      return null
    }
  }

  static generateTokens(user: User | Brand, type: "user" | "brand") {
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      role: type === "user" ? (user as User).role : "brand",
      type,
    }

    const refreshPayload: RefreshTokenPayload = {
      id: user.id,
      type,
    }

    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(refreshPayload),
    }
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    return await UserService.findByEmail(email)
  }

  static async findBrandByEmail(email: string): Promise<Brand | null> {
    return await BrandService.findByEmail(email)
  }

  static generatePasswordResetToken(email: string): string {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" })
  }

  static verifyPasswordResetToken(token: string): { email: string } | null {
    try {
      return jwt.verify(token, JWT_SECRET) as { email: string }
    } catch (error) {
      return null
    }
  }

  static generateEmailVerificationToken(email: string): string {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" })
  }

  static verifyEmailVerificationToken(token: string): { email: string } | null {
    try {
      return jwt.verify(token, JWT_SECRET) as { email: string }
    } catch (error) {
      return null
    }
  }
} 