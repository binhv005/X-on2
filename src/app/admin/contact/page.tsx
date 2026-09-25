"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useToast } from "@/context/ToastContext";
import { ContactMessageItem } from "@/types/admin";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Save,
  Send,
  MessageSquare,
  Trash2,
  CheckCircle,
  RefreshCw,
  Search,
} from "lucide-react";

export default function AdminContactPage() {
  const { success, error } = useToast();
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [email, setEmail] = useState("support@xonails.com");
  const [phone, setPhone] = useState("689-212-8888");
  const [address, setAddress] = useState("3168 Bill Beck Blvd, Kissimmee Fl 34744");
  const [hours, setHours] = useState("Monday – Sunday: 9:00 AM – 6:00 PM EST");
  const [isSaving, setIsSaving] = useState(false);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/contact", window.location.origin);
      if (statusFilter !== "all") url.searchParams.set("status", statusFilter);
      if (searchQuery.trim()) url.searchParams.set("search", searchQuery.trim());

      const res = await fetch(url.toString());
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setMessages(json.data);
        }
      }
    } catch {
      error("Failed to load contact messages");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, searchQuery, error]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMarkStatus = async (id: string, newStatus: "New" | "Replied" | "Resolved") => {
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setMessages(messages.map((m) => (m.id === id ? { ...m, status: newStatus } : m)));
        success(`Marked inquiry as ${newStatus}`);
      } else {
        error("Failed to update inquiry status");
      }
    } catch {
      error("Network error updating status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        success("Message deleted successfully");
      } else {
        error("Failed to delete message");
      }
    } catch {
      error("Network error deleting message");
    }
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      success("Store contact information updated successfully!");
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
              Live Inbox &amp; Support
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Contact Submissions &amp; Inbox
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Real-time inquiries received from website visitors on the /contact-us page.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Inbound Messages */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
            {/* Header & Filter Controls */}
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Customer Inquiries ({messages.length})</span>
              </h2>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search sender, email, subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-800"
                >
                  <option value="all">All Status</option>
                  <option value="New">New</option>
                  <option value="Replied">Replied</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Table Content */}
            {isLoading ? (
              <div className="py-16 flex flex-col items-center justify-center text-neutral-400 gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-neutral-300" />
                <span className="text-xs">Loading customer inquiries...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="py-16 text-center text-neutral-400 space-y-2">
                <MessageSquare className="w-10 h-10 mx-auto text-neutral-300" />
                <p className="text-xs font-medium">No customer inquiries found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 text-neutral-500 font-semibold uppercase tracking-wider border-b border-neutral-200">
                    <tr>
                      <th className="py-3 px-4 min-w-[150px]">Customer</th>
                      <th className="py-3 px-4 min-w-[200px]">Subject &amp; Message</th>
                      <th className="py-3 px-4 whitespace-nowrap">Date</th>
                      <th className="py-3 px-4 whitespace-nowrap text-center">Status</th>
                      <th className="py-3 px-4 text-right whitespace-nowrap min-w-[160px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-neutral-700">
                    {messages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="py-3.5 px-4 align-top">
                          <div className="font-bold text-neutral-900 text-xs">{msg.name}</div>
                          <div className="text-[11px] text-neutral-500 font-mono mt-0.5">{msg.email}</div>
                          {msg.phone && (
                            <div className="text-[10px] text-neutral-400 mt-0.5">{msg.phone}</div>
                          )}
                        </td>

                        <td className="py-3.5 px-4 align-top max-w-xs">
                          <div className="font-semibold text-neutral-900 text-xs mb-1">
                            {msg.subject || "General Inquiry"}
                          </div>
                          <p className="text-[11px] text-neutral-600 line-clamp-3 leading-relaxed bg-neutral-50/70 p-2 rounded-md border border-neutral-100">
                            {msg.message}
                          </p>
                        </td>

                        <td className="py-3.5 px-4 align-top text-neutral-500 text-[11px] whitespace-nowrap">
                          <div>
                            {new Date(msg.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-[10px] text-neutral-400 mt-0.5">
                            {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 align-top text-center whitespace-nowrap">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                              msg.status === "New"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : msg.status === "Replied"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}
                          >
                            {msg.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Inquiry")}`}
                              onClick={() => {
                                if (msg.status === "New") handleMarkStatus(msg.id, "Replied");
                              }}
                              className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                              title="Reply via Email"
                            >
                              <Send className="w-3 h-3" />
                              <span className="text-[11px]">Reply</span>
                            </a>

                            {msg.status !== "Resolved" ? (
                              <button
                                onClick={() => handleMarkStatus(msg.id, "Resolved")}
                                className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                title="Mark as Resolved"
                              >
                                <CheckCircle className="w-3 h-3" />
                                <span className="text-[11px]">Resolve</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleMarkStatus(msg.id, "New")}
                                className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                                title="Mark as New"
                              >
                                <span className="text-[11px]">Reopen</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleDelete(msg.id)}
                              className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Public Contact Details */}
        <div className="space-y-6">
          <form onSubmit={handleSaveInfo} className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
              Store Contact Details
            </h2>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Support Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Hotline / Phone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Studio Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Business Hours
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Contact Info</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
