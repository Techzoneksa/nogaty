import { UserRole } from "@prisma/client";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  tenantId?: string | null;
}

export interface Session {
  user: SessionUser;
  expires: string;
}

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  MERCHANT_OWNER: "/merchant",
  MERCHANT_STAFF: "/merchant",
  CUSTOMER: "/my-points/home",
};

export const PROTECTED_PATHS = [
  "/admin",
  "/merchant",
  "/my-points",
];

export const AUTH_COOKIE_NAME = "nogaty_session";