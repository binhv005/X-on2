import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { DataStore } from "@/lib/dataStore";

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { errorResponse } = await requireAuth(req);
  if (errorResponse) return errorResponse;

  const success = DataStore.deleteNewsletter(params.id);
  if (!success) {
    return NextResponse.json(
      { success: false, message: "Subscriber not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, message: "Subscriber removed successfully" });
}
