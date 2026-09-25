import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { DataStore } from "@/lib/dataStore";

export async function GET() {
  const gallery = DataStore.getGallery();
  return NextResponse.json({ success: true, data: gallery });
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAuth(req);
  if (errorResponse) return errorResponse;

  try {
    const body = await req.json();
    const { image, title } = body;

    if (!image || !title) {
      return NextResponse.json(
        { success: false, message: "Image and title are required" },
        { status: 400 }
      );
    }

    const newItem = DataStore.createGalleryItem({
      image,
      title,
      description: body.description || "",
      product: body.product || "",
      category: body.category || "Artisan Showcase",
      status: body.status || "published",
      displayOrder: Number(body.displayOrder || 0),
    });

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error("Create gallery item error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
