import { redirect } from "next/navigation";

export default function AdminJournalRedirect() {
  redirect("/admin/blog");
}
