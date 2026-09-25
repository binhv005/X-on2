import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { DataStore } from "@/lib/dataStore";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get("status") || undefined;
  const reviews = DataStore.getReviews({ status });
  return NextResponse.json({ success: true, data: reviews });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, rating, review, productTitle } = body;

    if (!customerName || !rating || !review) {
      return NextResponse.json(
        { success: false, message: "Customer name, rating, and review text are required" },
        { status: 400 }
      );
    }

    const newReview = DataStore.createReview({
      customerName,
      rating: Number(rating),
      review,
      productTitle: productTitle || "Handmade Press-On Nails",
      productId: body.productId || "",
      images: body.images || [],
      date: new Date().toLocaleDateString("en-US"),
      status: body.status || "pending",
    });

    return NextResponse.json({ success: true, data: newReview }, { status: 201 });
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create review" },
      { status: 500 }
    );
  }
}
