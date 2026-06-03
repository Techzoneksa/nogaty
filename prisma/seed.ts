import { PrismaClient, UserRole, TenantStatus, BusinessType, BranchStatus, CustomerStatus, PointTransactionType, RewardType, RewardStatus, RewardRedemptionStatus, CampaignType, CampaignChannel, CampaignStatus, IntegrationProvider, IntegrationStatus, SubscriptionStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");
  
  const demoPassword = await bcrypt.hash("demo1234", 10);

  // Clean existing data
  await prisma.integration.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.rewardRedemption.deleteMany();
  await prisma.reward.deleteMany();
  await prisma.pointTransaction.deleteMany();
  await prisma.loyaltyRule.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.user.deleteMany();
  await prisma.plan.deleteMany();

  console.log("🧹 Cleaned existing data");

  // Create Plans
  const plans = await Promise.all([
    prisma.plan.create({
      data: {
        name: "أساسية",
        priceMonthly: 99,
        priceYearly: 990,
        customerLimit: 500,
        branchLimit: 1,
        features: JSON.stringify(["عملاء حتى 500", "فرع واحد", "تقارير أساسية"]),
      },
    }),
    prisma.plan.create({
      data: {
        name: "احترافية",
        priceMonthly: 199,
        priceYearly: 1990,
        customerLimit: 2000,
        branchLimit: 3,
        features: JSON.stringify(["عملاء حتى 2000", "3 فروع", "تقارير متقدمة", "حملات واتساب"]),
      },
    }),
    prisma.plan.create({
      data: {
        name: "مؤسسات",
        priceMonthly: 499,
        priceYearly: 4990,
        customerLimit: -1,
        branchLimit: -1,
        features: JSON.stringify(["عملاء غير محدود", "فروع غير محدودة", "تقارير شاملة", "تكاملات API", "أولوية الدعم"]),
      },
    }),
  ]);

  console.log("📦 Created plans");

  // Create JAD Cloud Super Admin
  await prisma.user.create({
    data: {
      name: "JAD Cloud Admin",
      email: "admin@jadcloud.com",
      phone: "+966500000000",
      password: demoPassword, // In production, use proper hashing
      role: UserRole.SUPER_ADMIN,
      tenantId: null,
    },
  });

  console.log("👤 Created super admin");

  // Create Tenants with their data
  const tenantsData = [
    {
      name: "مطعم مذاق",
      slug: "mazag-restaurant",
      businessType: BusinessType.RESTAURANT,
      primaryColor: "#DC2626",
      secondaryColor: "#991B1B",
      planIndex: 1,
    },
    {
      name: "كافيه نقطة",
      slug: "nogta-cafe",
      businessType: BusinessType.CAFE,
      primaryColor: "#2563EB",
      secondaryColor: "#1E40AF",
      planIndex: 1,
    },
    {
      name: "سوبرماركت الحي",
      slug: "al-hay-supermarket",
      businessType: BusinessType.SUPERMARKET,
      primaryColor: "#059669",
      secondaryColor: "#047857",
      planIndex: 0,
    },
  ];

  for (const tenantData of tenantsData) {
    // Create Tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: tenantData.name,
        slug: tenantData.slug,
        businessType: tenantData.businessType,
        primaryColor: tenantData.primaryColor,
        secondaryColor: tenantData.secondaryColor,
        status: TenantStatus.ACTIVE,
        planId: plans[tenantData.planIndex].id,
      },
    });

    // Create Merchant Owner User
    const merchantUser = await prisma.user.create({
      data: {
        name: "مالك " + tenantData.name,
        email: `owner@${tenantData.slug}.com`,
        phone: "+966501111111",
        password: demoPassword,
        role: UserRole.MERCHANT_OWNER,
        tenantId: tenant.id,
      },
    });

    // Create Staff User
    await prisma.user.create({
      data: {
        name: "موظف " + tenantData.name,
        email: `staff@${tenantData.slug}.com`,
        phone: "+966502222222",
        password: demoPassword,
        role: UserRole.MERCHANT_STAFF,
        tenantId: tenant.id,
      },
    });

    // Create Loyalty Rule
    await prisma.loyaltyRule.create({
      data: {
        tenantId: tenant.id,
        pointsPerCurrency: 1,
        currencyPerPoint: 0.1,
        minimumPurchase: 1,
        welcomePoints: 50,
        pointsExpiryDays: 365,
        isActive: true,
      },
    });

    // Create Branches
    const branches = await Promise.all([
      prisma.branch.create({
        data: {
          tenantId: tenant.id,
          name: "الفرع الرئيسي",
          city: tenantData.slug === "nogta-cafe" ? "الرياض" : "جدة",
          district: "حي العليا",
          address: "شارع الأمير محمد بن سلمان",
          phone: "+966500000001",
          status: BranchStatus.ACTIVE,
        },
      }),
      prisma.branch.create({
        data: {
          tenantId: tenant.id,
          name: "فرع التخصصي",
          city: tenantData.slug === "nogta-cafe" ? "الرياض" : "جدة",
          district: "حي التخصصي",
          address: "شارع التخصصي",
          phone: "+966500000002",
          status: BranchStatus.ACTIVE,
        },
      }),
    ]);

    // Create Customers
    const customersData = [
      { name: "أحمد محمد", phone: "+966501234567" },
      { name: "فاطمة علي", phone: "+966502345678" },
      { name: "خالد سعيد", phone: "+966503456789" },
      { name: "نورة أحمد", phone: "+966504567890" },
      { name: "عبد الله حسن", phone: "+966505678901" },
      { name: "سارة خالد", phone: "+966506789012" },
      { name: "محمد علي", phone: "+966507890123" },
      { name: "ليلى إبراهيم", phone: "+966508901234" },
    ];

    const customers = await Promise.all(
      customersData.map((c, index) =>
        prisma.customer.create({
          data: {
            tenantId: tenant.id,
            name: c.name,
            phone: c.phone,
            email: `${c.name.toLowerCase().replace(/\s/g, ".")}@example.com`,
            status: CustomerStatus.ACTIVE,
            totalPoints: Math.floor(Math.random() * 500) + 50,
            totalVisits: Math.floor(Math.random() * 30) + 5,
            lastVisitAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
          },
        })
      )
    );

    // Create Point Transactions
    for (const customer of customers) {
      await Promise.all([
        prisma.pointTransaction.create({
          data: {
            tenantId: tenant.id,
            customerId: customer.id,
            branchId: branches[Math.floor(Math.random() * branches.length)].id,
            type: PointTransactionType.EARN,
            points: Math.floor(Math.random() * 100) + 20,
            amount: Math.floor(Math.random() * 100) + 10,
            description: "عملية شراء",
          },
        }),
        prisma.pointTransaction.create({
          data: {
            tenantId: tenant.id,
            customerId: customer.id,
            branchId: branches[Math.floor(Math.random() * branches.length)].id,
            type: PointTransactionType.EARN,
            points: Math.floor(Math.random() * 80) + 10,
            amount: Math.floor(Math.random() * 80) + 5,
            description: "عملية شراء",
          },
        }),
      ]);
    }

    // Create Rewards
    const rewards = await Promise.all([
      prisma.reward.create({
        data: {
          tenantId: tenant.id,
          name: "قهوة مجانية",
          description: "أي نوع من القهوة",
          rewardType: RewardType.FREE_ITEM,
          pointsCost: 100,
          value: 15,
          status: RewardStatus.ACTIVE,
        },
      }),
      prisma.reward.create({
        data: {
          tenantId: tenant.id,
          name: "خصم 10 ريال",
          description: "خصم على أي طلب",
          rewardType: RewardType.FIXED_DISCOUNT,
          pointsCost: 150,
          value: 10,
          status: RewardStatus.ACTIVE,
        },
      }),
      prisma.reward.create({
        data: {
          tenantId: tenant.id,
          name: "خصم 15%",
          description: "خصم نسبى على الفاتورة",
          rewardType: RewardType.PERCENTAGE_DISCOUNT,
          pointsCost: 200,
          value: 15,
          status: RewardStatus.ACTIVE,
        },
      }),
      prisma.reward.create({
        data: {
          tenantId: tenant.id,
          name: "وجبة مجانية",
          description: "أي وجبة من القائمة",
          rewardType: RewardType.FREE_ITEM,
          pointsCost: 500,
          value: 50,
          status: RewardStatus.ACTIVE,
        },
      }),
    ]);

    // Create Reward Redemptions for some customers
    for (let i = 0; i < 3; i++) {
      const customer = customers[i];
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      await prisma.rewardRedemption.create({
        data: {
          tenantId: tenant.id,
          customerId: customer.id,
          rewardId: reward.id,
          branchId: branches[0].id,
          pointsUsed: reward.pointsCost,
          status: RewardRedemptionStatus.COMPLETED,
          redeemedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
        },
      });
    }

    // Create Campaigns
    await Promise.all([
      prisma.campaign.create({
        data: {
          tenantId: tenant.id,
          name: "عرض ترحيبي",
          type: CampaignType.WELCOME,
          channel: CampaignChannel.WHATSAPP,
          status: CampaignStatus.SENT,
          message: "مرحباً بك في " + tenant.name + "!很高兴有你作为我们的客户。",
          targetSegment: "NEW_CUSTOMERS",
          sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
      }),
      prisma.campaign.create({
        data: {
          tenantId: tenant.id,
          name: "عرض الأسبوع",
          type: CampaignType.PROMOTION,
          channel: CampaignChannel.WHATSAPP,
          status: CampaignStatus.SCHEDULED,
          message: "هذا الأسبوع: كسب ضعف النقاط على كل عملية شراء!",
          targetSegment: "ALL_CUSTOMERS",
          scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        },
      }),
      prisma.campaign.create({
        data: {
          tenantId: tenant.id,
          name: "تذكير عيد ميلاد",
          type: CampaignType.BIRTHDAY,
          channel: CampaignChannel.SMS,
          status: CampaignStatus.DRAFT,
          message: "كل عام وأنت بخير! احصل على خصم خاص بعيد ميلادك.",
          targetSegment: "BIRTHDAY_THIS_MONTH",
        },
      }),
    ]);

    // Create Subscription
    await prisma.subscription.create({
      data: {
        tenantId: tenant.id,
        planId: plans[tenantData.planIndex].id,
        status: SubscriptionStatus.ACTIVE,
        startsAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        endsAt: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
        renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    // Create Integration (POS placeholder)
    await prisma.integration.create({
      data: {
        tenantId: tenant.id,
        provider: IntegrationProvider.POS,
        status: IntegrationStatus.NOT_CONNECTED,
        config: JSON.stringify({ apiKey: "", endpoint: "" }),
      },
    });

    console.log(`🏪 Created tenant: ${tenant.name}`);
  }

  console.log("✅ Seed completed successfully!");
  console.log("\n📋 Demo credentials:");
  console.log("Super Admin: admin@jadcloud.com (use DEMO_PASSWORD_HASH in production)");
  console.log("\nMerchant owners and staff created with DEMO_PASSWORD_HASH");
  console.log("\nNote: In production, implement proper password hashing with bcrypt/argon2");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });