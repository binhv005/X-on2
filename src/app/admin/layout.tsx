import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "X-ON Admin Dashboard",
  description: "Administrative control panel for X-ON Handmade Press-on Nails",
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
