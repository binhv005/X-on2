import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { DataStore } from "@/lib/dataStore";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const category = DataStore.getCategoryById(params.id);
  if (!category) {
    return NextResponse.json(
      { success: false, message: "Category not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: category });
}

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { errorResponse } = await requireAuth(req);
  if (errorResponse) return errorResponse;

  try {
    const body = await req.json();
    const updated = DataStore.updateCategory(params.id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { errorResponse } = await requireAuth(req);
  if (errorResponse) return errorResponse;

  const success = DataStore.deleteCategory(params.id);
  if (!success) {
    return NextResponse.json(
      { success: false, message: "Category not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, message: "Category deleted successfully" });
}
