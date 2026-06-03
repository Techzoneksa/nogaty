"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Badge } from "@/components/Badge";
import { Modal } from "@/components/Modal";
import { Table } from "@/components/Table";
import { MobileCard } from "@/components/MobileCard";

interface Customer {
  id: string;
  name: string;
  phone: string;
  points: number;
  visits: number;
  lastVisit: string;
  branch: string;
  status: "active" | "inactive";
  tier: "Bronze" | "Silver" | "Gold" | "VIP";
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form Fields for Add Customer
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newBranch, setNewBranch] = useState("العليا");
  const [newPoints, setNewPoints] = useState("50");

  const [customers, setCustomers] = useState<Customer[]>([
    { id: "1", name: "محمد العتيبي", phone: "0501234567", points: 420, visits: 24, lastVisit: "2026-06-01", branch: "العليا", status: "active", tier: "Gold" },
    { id: "2", name: "سارة أحمد صالح", phone: "0567890123", points: 150, visits: 8, lastVisit: "2026-05-30", branch: "التخصصي", status: "active", tier: "Silver" },
    { id: "3", name: "عبد العزيز الرويلي", phone: "0543210987", points: 890, visits: 45, lastVisit: "2026-06-02", branch: "العليا", status: "active", tier: "VIP" },
    { id: "4", name: "فاطمة الحسين", phone: "0533334444", points: 45, visits: 2, lastVisit: "2026-04-15", branch: "التخصصي", status: "inactive", tier: "Bronze" },
    { id: "5", name: "سلطان الحربي", phone: "0559998888", points: 12, visits: 1, lastVisit: "2026-05-10", branch: "الملز", status: "inactive", tier: "Bronze" },
    { id: "6", name: "علي القحطاني", phone: "0509876543", points: 310, visits: 19, lastVisit: "2026-05-28", branch: "العليا", status: "active", tier: "Silver" },
  ]);

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const newCust: Customer = {
      id: String(customers.length + 1),
      name: newName,
      phone: newPhone,
      points: Number(newPoints) || 0,
      visits: 1,
      lastVisit: new Date().toISOString().split("T")[0],
      branch: newBranch,
      status: "active",
      tier: Number(newPoints) > 500 ? "VIP" : Number(newPoints) > 300 ? "Gold" : Number(newPoints) > 100 ? "Silver" : "Bronze",
    };

    setCustomers([newCust, ...customers]);
    setIsAddModalOpen(false);

    // Reset Form
    setNewName("");
    setNewPhone("");
    setNewPoints("50");
  };

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.includes(searchTerm) || cust.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && cust.status === "active") ||
      (statusFilter === "inactive" && cust.status === "inactive") ||
      (statusFilter === "high_points" && cust.points >= 300);

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: "الاسم والمنشأة",
      accessor: (row: Customer) => (
        <Link href={`/dashboard/customers/${row.id}`} className="flex items-center gap-3 hover:underline">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">
            {row.name.charAt(0)}
          </div>
          <div className="flex flex-col text-right">
            <span className="font-bold text-xs">{row.name}</span>
            <span className="text-[10px] text-text-secondary font-mono">{row.phone}</span>
          </div>
        </Link>
      ),
    },
    {
      header: "النقاط",
      accessor: (row: Customer) => <span className="font-black text-primary">{row.points}</span>,
    },
    {
      header: "مستوى العميل",
      accessor: (row: Customer) => {
        const variants = { Bronze: "neutral", Silver: "secondary", Gold: "accent", VIP: "danger" };
        return <Badge variant={variants[row.tier] as "neutral" | "secondary" | "accent" | "danger"}>{row.tier}</Badge>;
      },
    },
    {
      header: "إجمالي الزيارات",
      accessor: (row: Customer) => <span>{row.visits} زيارات</span>,
    },
    {
      header: "آخر زيارة",
      accessor: (row: Customer) => <span className="text-xs font-mono">{row.lastVisit}</span>,
    },
    {
      header: "الفرع",
      accessor: (row: Customer) => <span className="text-xs">{row.branch}</span>,
    },
    {
      header: "الحالة",
      accessor: (row: Customer) => (
        <Badge variant={row.status === "active" ? "success" : "danger"}>
          {row.status === "active" ? "نشط" : "خامل"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 select-none">
      <PageHeader
        title="إدارة قاعدة بيانات العملاء"
        description="استعرض عملاء برنامج الولاء، وابحث عنهم برقم الجوال، وأضف عملاء يدويين أو تابع سجل استبدال نقاطهم."
        breadcrumbs={["لوحة التحكم", "العملاء"]}
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
          >
            إضافة عميل جديد
          </Button>
        }
      />

      {/* Filters and Search Area */}
      <Card className="p-4 bg-white flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute right-3 top-2.5 text-text-secondary pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input
            type="text"
            placeholder="ابحث بالاسم أو رقم الجوال..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg-base/70 border border-border-base rounded-xl py-2 pr-9 pl-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-right"
          />
        </div>

        {/* Filter Tabs/Select */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto justify-start md:justify-end">
          {[
            { id: "all", label: "كل العملاء" },
            { id: "active", label: "النشطين" },
            { id: "inactive", label: "الخاملين" },
            { id: "high_points", label: "نقاط عالية (300+)" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id)}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                statusFilter === filter.id
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-white text-text-secondary border-border-base hover:text-text-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Desktop Tables (Hidden on mobile) */}
      <div className="hidden md:block">
        <Table
          columns={columns}
          data={filteredCustomers}
          emptyMessage="لم يتم العثور على عملاء يطابقون خيارات البحث."
        />
      </div>

      {/* Mobile Card Layout (Hidden on desktop) */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredCustomers.length === 0 ? (
          <Card className="p-8 text-center text-text-secondary text-xs">
            لا يوجد عملاء يطابقون البحث حالياً.
          </Card>
        ) : (
          filteredCustomers.map((cust) => {
            const variants = { Bronze: "neutral", Silver: "secondary", Gold: "accent", VIP: "danger" };
            return (
              <Link href={`/dashboard/customers/${cust.id}`} key={cust.id} className="block">
                <MobileCard
                  title={cust.name}
                  subtitle={cust.phone}
                  badge={
                    <div className="flex gap-1.5 items-center">
                      <Badge variant={cust.status === "active" ? "success" : "danger"}>
                        {cust.status === "active" ? "نشط" : "خامل"}
                      </Badge>
                      <Badge variant={variants[cust.tier] as "neutral" | "secondary" | "accent" | "danger"}>
                        {cust.tier}
                      </Badge>
                    </div>
                  }
                  fields={[
                    { label: "رصيد النقاط", value: <span className="text-primary font-black">{cust.points}</span> },
                    { label: "الزيارات", value: `${cust.visits} زيارات` },
                    { label: "آخر زيارة", value: cust.lastVisit },
                    { label: "الفرع", value: cust.branch },
                  ]}
                />
              </Link>
            );
          })
        )}
      </div>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="إضافة عميل جديد لبرنامج الولاء"
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              إلغاء
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddCustomer}>
              حفظ العميل
            </Button>
          </div>
        }
      >
        <form onSubmit={handleAddCustomer} className="flex flex-col gap-4 text-right">
          <Input
            label="اسم العميل الكامل"
            placeholder="مثال: صالح بن محمد"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            required
          />
          <Input
            label="رقم الجوال"
            placeholder="05xxxxxxxx"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="فرع التسجيل الأول"
              options={[
                { value: "العليا", label: "فرع العليا" },
                { value: "التخصصي", label: "فرع التخصصي" },
                { value: "الملز", label: "فرع الملز" },
              ]}
              value={newBranch}
              onChange={(e) => setNewBranch(e.target.value)}
            />
            <Input
              label="نقاط ترحيبية أولى"
              type="number"
              value={newPoints}
              onChange={(e) => setNewPoints(e.target.value)}
              placeholder="50"
            />
          </div>
          <p className="text-[10px] text-text-secondary leading-relaxed bg-bg-base p-3 rounded-xl">
            * ستضاف النقاط الترحيبية المحددة للعميل فور حفظه وتفعيل حسابه تلقائياً.
          </p>
        </form>
      </Modal>
    </div>
  );
}
