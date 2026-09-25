import { NextResponse } from "next/server";
import { DataStore } from "@/lib/dataStore";

export async function GET() {
  try {
    const wholesaleList = DataStore.getWholesale();
    const newsletterList = DataStore.getNewsletter();
    const contactList = DataStore.getContactMessages();
    const ordersResult = DataStore.getOrders();

    // Count new or active items
    const wholesaleCount = wholesaleList.filter(
      (w) => w.status === "New"
    ).length || wholesaleList.length;

    const vipClubCount = newsletterList.filter(
      (n) => n.status === "Subscribed"
    ).length || newsletterList.length;

    const contactCount = contactList.filter(
      (c) => c.status === "New"
    ).length || contactList.length;

    const ordersCount = Array.isArray(ordersResult.orders)
      ? ordersResult.orders.filter(
          (o) => o.orderStatus === "pending" || o.orderStatus === "processing"
        ).length
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        wholesale: wholesaleCount,
        vipClub: vipClubCount,
        contact: contactCount,
        orders: ordersCount,
      },
    });
  } catch (error) {
    console.error("Failed to get sidebar counts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch counts" },
      { status: 500 }
    );
  }
}
