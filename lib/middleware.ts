import { NextRequest, NextResponse } from "next/server"
import { AuthService, JWTPayload } from "./auth"
import { UserService, BrandService } from "./db/service"
import type { User, Brand } from "./db/schema"

export interface AuthenticatedRequest extends NextRequest {
  user?: User
  brand?: Brand
  auth?: JWTPayload
}

export async function authenticateUser(request: NextRequest): Promise<AuthenticatedRequest> {
  const authHeader = request.headers.get("authorization")
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return request as AuthenticatedRequest
  }

  const token = authHeader.substring(7)
  console.log({token})
  const payload = AuthService.verifyAccessToken(token)
  console.log({payload})

  if (!payload) {
    return request as AuthenticatedRequest
  }

  const authenticatedRequest = request as AuthenticatedRequest
  authenticatedRequest.auth = payload

  try {
    if (payload.type === "user") {
      const user = await UserService.findById(payload.id)
      if (user) {
        authenticatedRequest.user = user
      }
    } else if (payload.type === "brand") {
      const brand = await BrandService.findById(payload.id)
      if (brand) {
        authenticatedRequest.brand = brand
      }
    }
  } catch (error) {
    console.error("Error fetching user/brand:", error)
  }

  return authenticatedRequest
}

export function requireAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const authenticatedRequest = await authenticateUser(request)
    console.log({auth: authenticatedRequest.auth})
    
    if (!authenticatedRequest.auth) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      )
    }

    return handler(authenticatedRequest)
  }
}

export function requireRole(allowedRoles: string[]) {
  return (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) => {
    return requireAuth(async (request: AuthenticatedRequest) => {
      if (!request.auth || !allowedRoles.includes(request.auth.role)) {
        return NextResponse.json(
          { success: false, error: { code: "FORBIDDEN", message: "Insufficient permissions" } },
          { status: 403 }
        )
      }

      return handler(request)
    })
  }
}

export function requireUserType(type: "user" | "brand") {
  return (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) => {
    return requireAuth(async (request: AuthenticatedRequest) => {
      if (!request.auth || request.auth.type !== type) {
        return NextResponse.json(
          { success: false, error: { code: "FORBIDDEN", message: "Invalid user type" } },
          { status: 403 }
        )
      }

      return handler(request)
    })
  }
}

export function optionalAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const authenticatedRequest = await authenticateUser(request)
    return handler(authenticatedRequest)
  }
} 