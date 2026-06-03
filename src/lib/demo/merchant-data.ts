import { UserRole } from "@prisma/client";

export interface DemoTenant {
  id: string;
  name: string;
  slug: string;
  businessType: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface DemoBranch {
  id: string;
  tenantId: string;
  name: string;
  city: string;
  district: string;
}

export interface DemoCustomer {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email?: string;
  totalPoints: number;
  totalVisits: number;
  lastVisitAt: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  tier: "Bronze" | "Silver" | "Gold" | "VIP";
}

export interface DemoTransaction {
  id: string;
  tenantId: string;
  customerId: string;
  branchId: string;
  type: "EARN" | "REDEEM" | "ADJUST" | "EXPIRE";
  points: number;
  amount?: number;
  description: string;
  createdAt: string;
}

export interface DemoReward {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  rewardType: "FIXED_DISCOUNT" | "PERCENTAGE_DISCOUNT" | "FREE_ITEM" | "CUSTOM";
  pointsCost: number;
  value: number;
  redemptions: number;
}

export interface DemoCampaign {
  id: string;
  tenantId: string;
  name: string;
  type: string;
  status: "DRAFT" | "SCHEDULED" | "SENT" | "PAUSED";
  sentAt?: string;
  scheduledAt?: string;
}

// Tenant IDs from demo-users.ts
export const DEMO_TENANTS: Record<string, DemoTenant> = {
  "demo-tenant-1": {
    id: "demo-tenant-1",
    name: "مطعم مذاق",
    slug: "mazag-restaurant",
    businessType: "RESTAURANT",
    primaryColor: "#DC2626",
    secondaryColor: "#991B1B",
  },
  "demo-tenant-2": {
    id: "demo-tenant-2",
    name: "كافيه نقطة",
    slug: "nogta-cafe",
    businessType: "CAFE",
    primaryColor: "#2563EB",
    secondaryColor: "#1E40AF",
  },
  "demo-tenant-3": {
    id: "demo-tenant-3",
    name: "سوبرماركت الحي",
    slug: "al-hay-supermarket",
    businessType: "SUPERMARKET",
    primaryColor: "#059669",
    secondaryColor: "#047857",
  },
};

// Tenant ID mapping from tenant slug
export function getTenantIdBySlug(slug: string): string | null {
  const tenant = Object.values(DEMO_TENANTS).find((t) => t.slug === slug);
  return tenant?.id || null;
}

// Get tenant ID for a user based on their email
export function getTenantIdForUser(email: string): string | null {
  if (email.includes("mazag")) return "demo-tenant-1";
  if (email.includes("nogta")) return "demo-tenant-2";
  if (email.includes("supermarket")) return "demo-tenant-3";
  return "demo-tenant-1"; // default
}

export const DEMO_BRANCHES: DemoBranch[] = [
  { id: "branch-1-1", tenantId: "demo-tenant-1", name: "الفرع الرئيسي", city: "جدة", district: "حي العليا" },
  { id: "branch-1-2", tenantId: "demo-tenant-1", name: "فرع التخصصي", city: "جدة", district: "حي التخصصي" },
  { id: "branch-2-1", tenantId: "demo-tenant-2", name: "الفرع الرئيسي", city: "الرياض", district: "حي العليا" },
  { id: "branch-2-2", tenantId: "demo-tenant-2", name: "فرع التخصصي", city: "الرياض", district: "حي التخصصي" },
  { id: "branch-3-1", tenantId: "demo-tenant-3", name: "المقر الرئيسي", city: "الرياض", district: "حي النزهة" },
];

export const DEMO_CUSTOMERS: DemoCustomer[] = [
  // Tenant 1 - مطعم مذاق
  { id: "cust-1-1", tenantId: "demo-tenant-1", name: "سعيد القحطاني", phone: "+966501234567", email: "saeed@example.com", totalPoints: 240, totalVisits: 15, lastVisitAt: "2026-06-02T10:00:00Z", status: "ACTIVE", tier: "Gold" },
  { id: "cust-1-2", tenantId: "demo-tenant-1", name: "فاطمة أحمد", phone: "+966502345678", email: "fatima@example.com", totalPoints: 85, totalVisits: 8, lastVisitAt: "2026-06-01T14:30:00Z", status: "ACTIVE", tier: "Bronze" },
  { id: "cust-1-3", tenantId: "demo-tenant-1", name: "عبد المجيد الحربي", phone: "+966503456789", totalPoints: 150, totalVisits: 12, lastVisitAt: "2026-05-30T19:00:00Z", status: "ACTIVE", tier: "Silver" },
  { id: "cust-1-4", tenantId: "demo-tenant-1", name: "نورة السعيد", phone: "+966504567890", email: "noura@example.com", totalPoints: 420, totalVisits: 25, lastVisitAt: "2026-06-02T12:00:00Z", status: "ACTIVE", tier: "Gold" },
  { id: "cust-1-5", tenantId: "demo-tenant-1", name: "خالد العتيبي", phone: "+966505678901", totalPoints: 75, totalVisits: 5, lastVisitAt: "2026-05-28T20:00:00Z", status: "ACTIVE", tier: "Bronze" },
  { id: "cust-1-6", tenantId: "demo-tenant-1", name: "سارة محمد", phone: "+966506789012", email: "sarah@example.com", totalPoints: 200, totalVisits: 18, lastVisitAt: "2026-06-01T08:00:00Z", status: "ACTIVE", tier: "Silver" },
  { id: "cust-1-7", tenantId: "demo-tenant-1", name: "محمد علي", phone: "+966507890123", totalPoints: 320, totalVisits: 20, lastVisitAt: "2026-05-31T13:00:00Z", status: "ACTIVE", tier: "Gold" },
  { id: "cust-1-8", tenantId: "demo-tenant-1", name: "ليلى إبراهيم", phone: "+966508901234", email: "layla@example.com", totalPoints: 50, totalVisits: 3, lastVisitAt: "2026-05-25T18:00:00Z", status: "ACTIVE", tier: "Bronze" },

  // Tenant 2 - كافيه نقطة
  { id: "cust-2-1", tenantId: "demo-tenant-2", name: "أحمد محمد", phone: "+966511234567", email: "ahmed@example.com", totalPoints: 350, totalVisits: 22, lastVisitAt: "2026-06-02T09:00:00Z", status: "ACTIVE", tier: "Gold" },
  { id: "cust-2-2", tenantId: "demo-tenant-2", name: "فاطمة الزهراء", phone: "+966522345678", totalPoints: 120, totalVisits: 10, lastVisitAt: "2026-06-01T15:00:00Z", status: "ACTIVE", tier: "Silver" },
  { id: "cust-2-3", tenantId: "demo-tenant-2", name: "عبدالله سعيد", phone: "+966533456789", email: "abdullah@example.com", totalPoints: 80, totalVisits: 6, lastVisitAt: "2026-05-29T14:00:00Z", status: "ACTIVE", tier: "Bronze" },
  { id: "cust-2-4", tenantId: "demo-tenant-2", name: "نورة الأحمد", phone: "+966544567890", totalPoints: 500, totalVisits: 30, lastVisitAt: "2026-06-02T11:00:00Z", status: "ACTIVE", tier: "Gold" },
  { id: "cust-2-5", tenantId: "demo-tenant-2", name: "خالد الدوسري", phone: "+966555678901", email: "khaled@example.com", totalPoints: 95, totalVisits: 7, lastVisitAt: "2026-05-27T19:00:00Z", status: "ACTIVE", tier: "Bronze" },
  { id: "cust-2-6", tenantId: "demo-tenant-2", name: "سارة القحطاني", phone: "+966566789012", totalPoints: 180, totalVisits: 14, lastVisitAt: "2026-06-01T10:00:00Z", status: "ACTIVE", tier: "Silver" },

  // Tenant 3 - سوبرماركت الحي
  { id: "cust-3-1", tenantId: "demo-tenant-3", name: "محمد الحربي", phone: "+966577890123", email: "mohammed@example.com", totalPoints: 600, totalVisits: 40, lastVisitAt: "2026-06-02T08:00:00Z", status: "ACTIVE", tier: "VIP" },
  { id: "cust-3-2", tenantId: "demo-tenant-3", name: "أحلام السعيد", phone: "+966588901234", totalPoints: 280, totalVisits: 20, lastVisitAt: "2026-06-01T16:00:00Z", status: "ACTIVE", tier: "Gold" },
  { id: "cust-3-3", tenantId: "demo-tenant-3", name: "صالح العتيبي", phone: "+966599012345", email: "saleh@example.com", totalPoints: 150, totalVisits: 12, lastVisitAt: "2026-05-30T12:00:00Z", status: "ACTIVE", tier: "Silver" },
  { id: "cust-3-4", tenantId: "demo-tenant-3", name: "منى القحطاني", phone: "+966500123456", totalPoints: 90, totalVisits: 8, lastVisitAt: "2026-05-28T14:00:00Z", status: "ACTIVE", tier: "Bronze" },
];

export const DEMO_TRANSACTIONS: DemoTransaction[] = [
  { id: "tx-1", tenantId: "demo-tenant-1", customerId: "cust-1-1", branchId: "branch-1-1", type: "EARN", points: 35, amount: 35, description: "عملية شراء", createdAt: "2026-06-02T10:00:00Z" },
  { id: "tx-2", tenantId: "demo-tenant-1", customerId: "cust-1-2", branchId: "branch-1-1", type: "EARN", points: 18, amount: 18, description: "عملية شراء", createdAt: "2026-06-01T14:30:00Z" },
  { id: "tx-3", tenantId: "demo-tenant-1", customerId: "cust-1-3", branchId: "branch-1-2", type: "REDEEM", points: -100, amount: 10, description: "قهوة مجانية", createdAt: "2026-05-30T19:00:00Z" },
  { id: "tx-4", tenantId: "demo-tenant-1", customerId: "cust-1-4", branchId: "branch-1-1", type: "EARN", points: 82, amount: 82, description: "عملية شراء", createdAt: "2026-06-02T12:00:00Z" },
  { id: "tx-5", tenantId: "demo-tenant-2", customerId: "cust-2-1", branchId: "branch-2-1", type: "EARN", points: 45, amount: 45, description: "عملية شراء", createdAt: "2026-06-02T09:00:00Z" },
  { id: "tx-6", tenantId: "demo-tenant-2", customerId: "cust-2-4", branchId: "branch-2-1", type: "EARN", points: 125, amount: 125, description: "عملية شراء", createdAt: "2026-06-02T11:00:00Z" },
];

export const DEMO_REWARDS: DemoReward[] = [
  { id: "reward-1", tenantId: "demo-tenant-1", name: "قهوة مجانية", description: "أي نوع من القهوة", rewardType: "FREE_ITEM", pointsCost: 100, value: 15, redemptions: 145 },
  { id: "reward-2", tenantId: "demo-tenant-1", name: "خصم 10 ريال", description: "خصم على أي طلب", rewardType: "FIXED_DISCOUNT", pointsCost: 150, value: 10, redemptions: 98 },
  { id: "reward-3", tenantId: "demo-tenant-1", name: "خصم 15%", description: "خصم نسبي على الفاتورة", rewardType: "PERCENTAGE_DISCOUNT", pointsCost: 200, value: 15, redemptions: 67 },
  { id: "reward-4", tenantId: "demo-tenant-1", name: "وجبة مجانية", description: "أي وجبة من القائمة", rewardType: "FREE_ITEM", pointsCost: 500, value: 50, redemptions: 23 },
  { id: "reward-5", tenantId: "demo-tenant-2", name: "قهوة مخفوق", description: "كافيه نقطة", rewardType: "FREE_ITEM", pointsCost: 80, value: 12, redemptions: 210 },
  { id: "reward-6", tenantId: "demo-tenant-2", name: "كيك مجاني", description: "أي نوع", rewardType: "FREE_ITEM", pointsCost: 120, value: 18, redemptions: 156 },
];

export const DEMO_CAMPAIGNS: DemoCampaign[] = [
  { id: "camp-1", tenantId: "demo-tenant-1", name: "عرض ترحيبي", type: "WELCOME", status: "SENT", sentAt: "2026-05-28" },
  { id: "camp-2", tenantId: "demo-tenant-1", name: "عرض الأسبوع", type: "PROMOTION", status: "SCHEDULED", scheduledAt: "2026-06-05" },
  { id: "camp-3", tenantId: "demo-tenant-2", name: "كسب نقاط مضاعفة", type: "PROMOTION", status: "SENT", sentAt: "2026-05-25" },
];

export function getCustomersByTenant(tenantId: string): DemoCustomer[] {
  return DEMO_CUSTOMERS.filter((c) => c.tenantId === tenantId);
}

export function getCustomerById(customerId: string, tenantId: string): DemoCustomer | undefined {
  return DEMO_CUSTOMERS.find((c) => c.id === customerId && c.tenantId === tenantId);
}

export function getTransactionsByCustomer(customerId: string, tenantId: string): DemoTransaction[] {
  return DEMO_TRANSACTIONS.filter((t) => t.customerId === customerId && t.tenantId === tenantId);
}

export function getBranchesByTenant(tenantId: string): DemoBranch[] {
  return DEMO_BRANCHES.filter((b) => b.tenantId === tenantId);
}

export function getRewardsByTenant(tenantId: string): DemoReward[] {
  return DEMO_REWARDS.filter((r) => r.tenantId === tenantId);
}

export function getCampaignsByTenant(tenantId: string): DemoCampaign[] {
  return DEMO_CAMPAIGNS.filter((c) => c.tenantId === tenantId);
}

export function getDashboardStats(tenantId: string) {
  const customers = getCustomersByTenant(tenantId);
  const branches = getBranchesByTenant(tenantId);
  const transactions = DEMO_TRANSACTIONS.filter((t) => t.tenantId === tenantId);
  const rewards = getRewardsByTenant(tenantId);
  const campaigns = getCampaignsByTenant(tenantId);

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "ACTIVE").length;
  const totalPointsIssued = transactions
    .filter((t) => t.type === "EARN")
    .reduce((sum, t) => sum + t.points, 0);
  const totalPointsRedeemed = Math.abs(
    transactions.filter((t) => t.type === "REDEEM").reduce((sum, t) => sum + t.points, 0)
  );
  const totalRewardsRedeemed = rewards.reduce((sum, r) => sum + r.redemptions, 0);
  const totalCampaigns = campaigns.length;
  const activeBranches = branches.filter((b) => b).length;
  
  const repeatRate = totalCustomers > 0 
    ? ((customers.filter((c) => c.totalVisits > 1).length / totalCustomers) * 100).toFixed(1)
    : "0";

  const recentCustomers = [...customers]
    .sort((a, b) => new Date(b.lastVisitAt).getTime() - new Date(a.lastVisitAt).getTime())
    .slice(0, 5);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const topRewards = [...rewards]
    .sort((a, b) => b.redemptions - a.redemptions)
    .slice(0, 3);

  return {
    totalCustomers,
    activeCustomers,
    totalPointsIssued,
    totalPointsRedeemed,
    totalRewardsRedeemed,
    totalCampaigns,
    repeatRate,
    activeBranches,
    recentCustomers,
    recentTransactions,
    topRewards,
  };
}