import { UserRole } from "@prisma/client";
import type { SessionUser } from "./types";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  tenantId: string | null;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: "demo-super-admin",
    name: "JAD Cloud Admin",
    email: "admin@jadcloud.com",
    phone: "+966500000000",
    password: "demo1234",
    role: UserRole.SUPER_ADMIN,
    tenantId: null,
  },
  {
    id: "demo-merchant-owner-1",
    name: "مالك مطعم مذاق",
    email: "owner@mazag-restaurant.com",
    phone: "+966501111111",
    password: "demo1234",
    role: UserRole.MERCHANT_OWNER,
    tenantId: "demo-tenant-1",
  },
  {
    id: "demo-merchant-staff-1",
    name: "موظف مطعم مذاق",
    email: "staff@mazag-restaurant.com",
    phone: "+966502222222",
    password: "demo1234",
    role: UserRole.MERCHANT_STAFF,
    tenantId: "demo-tenant-1",
  },
  {
    id: "demo-merchant-owner-2",
    name: "مالك كافيه نقطة",
    email: "owner@nogta-cafe.com",
    phone: "+966501111112",
    password: "demo1234",
    role: UserRole.MERCHANT_OWNER,
    tenantId: "demo-tenant-2",
  },
  {
    id: "demo-customer-1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+966501234567",
    password: "demo1234",
    role: UserRole.CUSTOMER,
    tenantId: "demo-tenant-1",
  },
];

export function findDemoUserByEmail(email: string): DemoUser | undefined {
  return DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function validateDemoCredentials(email: string, password: string): SessionUser | null {
  const user = findDemoUserByEmail(email);
  if (!user || user.password !== password) {
    return null;
  }
  const { password: _, ...sessionUser } = user;
  return sessionUser as SessionUser;
}