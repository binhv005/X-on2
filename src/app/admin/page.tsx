"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DashboardStats } from "@/types/admin";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Clock,
  Briefcase,
  ArrowUpRight,
  AlertCircle,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`/api/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      }
    } catch (e) {
      console.error("Failed to load dashboard stats:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Revenue",
      value: stats ? `$${stats.totalRevenue.toLocaleString()}` : "$0",
      change: "+18.4% vs last period",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Orders",
      value: stats ? stats.totalOrders.toString() : "0",
      change: "+12.1% orders",
      icon: ShoppingBag,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Active Products",
      value: stats ? stats.totalProducts.toString() : "0",
      change: "In catalog",
      icon: Package,
      color: "from-rose-500 to-pink-600",
      textColor: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      title: "Total Customers",
      value: stats ? stats.totalCustomers.toString() : "0",
      change: "+8 new buyers",
      icon: Users,
      color: "from-sky-500 to-indigo-600",
      textColor: "text-sky-600",
      bgColor: "bg-sky-50",
    },
    {
      title: "VIP Club Members",
      value: stats ? (stats.vipSubscribersCount ?? 0).toString() : "0",
      change: "VIP email list",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Wholesale & Leads",
      value: stats ? ((stats.wholesaleRequests ?? 0) + (stats.contactMessagesCount ?? 0)).toString() : "0",
      change: "Inquiries & forms",
      icon: Briefcase,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  // Simple SVG dynamic bar/area chart calculation
  const maxRevenue = stats?.salesOverview?.revenue
    ? Math.max(...stats.salesOverview.revenue, 100)
    : 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Real-time analytics and performance metrics for X-ON Nails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/create"
            className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <span>Orders</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
          </Link>
        </div>
      </div>

      {/* 6 Statistic Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/70 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-neutral-500 truncate">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl ${card.bgColor} ${card.textColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                {card.value}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 truncate">
                {card.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid for Recent Orders & Best Sellers / Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/70 p-5 sm:p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-neutral-900">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-xs">
              <thead className="text-neutral-400 font-semibold uppercase tracking-wider border-b border-neutral-100">
                <tr>
                  <th className="pb-3 whitespace-nowrap">Order</th>
                  <th className="pb-3 min-w-[160px]">Customer</th>
                  <th className="pb-3 whitespace-nowrap">Total</th>
                  <th className="pb-3 whitespace-nowrap">Payment</th>
                  <th className="pb-3 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {stats?.recentOrders?.length ? (
                  stats.recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3 font-semibold text-neutral-900 whitespace-nowrap">
                        <Link href={`/admin/orders/${ord.id}`} className="hover:underline">
                          {ord.orderNumber}
                        </Link>
                      </td>
                      <td className="py-3">
                        <div className="font-medium text-neutral-900 whitespace-nowrap">{ord.customer.name}</div>
                        <div className="text-[11px] text-neutral-400 whitespace-nowrap">{ord.customer.email}</div>
                      </td>
                      <td className="py-3 font-bold text-neutral-900 whitespace-nowrap">
                        ${ord.total.toFixed(2)}
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase inline-block ${
                            ord.paymentStatus === "paid"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase inline-block ${
                            ord.orderStatus === "delivered"
                              ? "bg-emerald-50 text-emerald-700"
                              : ord.orderStatus === "shipped"
                              ? "bg-sky-50 text-sky-700"
                              : "bg-neutral-100 text-neutral-700"
                          }`}
                        >
                          {ord.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-neutral-400">
                      No recent orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side: Best Sellers & Low Stock Alert */}
        <div className="space-y-6">
          {/* Best Sellers */}
          <div className="bg-white rounded-2xl border border-neutral-200/70 p-5 shadow-xs">
            <h2 className="text-base font-bold text-neutral-900 mb-4">
              Best Selling Press-Ons
            </h2>
            <div className="space-y-3">
              {stats?.bestSellingProducts?.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden shrink-0 border border-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      {item.quantitySold} sets sold
                    </p>
                  </div>
                  <div className="text-xs font-bold text-neutral-900">
                    ${item.revenue.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-2xl border border-neutral-200/70 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <h2 className="text-sm font-bold text-neutral-900">
                Low Stock Warning
              </h2>
            </div>
            <div className="space-y-2">
              {stats?.lowStockProducts?.length ? (
                stats.lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50/50 border border-rose-100 text-xs"
                  >
                    <div className="truncate mr-2">
                      <p className="font-semibold text-neutral-900 truncate">{p.name}</p>
                      <p className="text-[10px] text-neutral-500">{p.sku}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 font-bold text-[10px] shrink-0">
                      {p.stock} left
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-400">All inventory levels healthy.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
