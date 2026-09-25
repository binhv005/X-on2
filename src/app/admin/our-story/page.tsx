"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { BookOpen, Save, Sparkles, MapPin, Phone, CheckCircle2 } from "lucide-react";

export default function AdminOurStoryPage() {
  const { success } = useToast();
  const [tagline, setTagline] = useState("Welcome to X-ON");
  const [headline, setHeadline] = useState("Where Modern Nail Artistry Meets Effortless Beauty.");
  const [paragraph1, setParagraph1] = useState(
    "Created for nail lovers and professionals alike, X-ON offers handmade press-on nails and carefully selected nail essentials designed with quality, style, and performance in mind."
  );
  const [paragraph2, setParagraph2] = useState(
    "From statement-making nail sets to everyday professional supplies, every X-ON product is chosen to make beautiful nails easier, faster, and more accessible—without compromising on a polished, luxury finish."
  );
  const [slogan, setSlogan] = useState("X-ON — Press On. Slay On. Repeat.");
  const [address, setAddress] = useState("3168 Bill Beck Blvd, Kissimmee Fl 34744");
  const [phone, setPhone] = useState("689-212-8888");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      success("Our Story content updated successfully!");
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
              Brand Page Content
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Our Story Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Edit brand storytelling, company vision, and contact details shown on the /about page.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
        >
          {isSaving ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Headline &amp; Brand Philosophy</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Sub-heading / Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Main Story Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-serif font-bold text-neutral-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Story Paragraph 1
              </label>
              <textarea
                rows={3}
                value={paragraph1}
                onChange={(e) => setParagraph1(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-indigo-600 focus:bg-white leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Story Paragraph 2
              </label>
              <textarea
                rows={3}
                value={paragraph2}
                onChange={(e) => setParagraph2(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-indigo-600 focus:bg-white leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Brand Slogan / Signature
              </label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>Showroom &amp; Studio Info</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  Studio Phone
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
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs sticky top-24">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Live Preview
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized
              </span>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-150 text-center space-y-3 text-neutral-800">
              <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                {tagline}
              </div>
              <div className="text-sm font-bold font-serif text-neutral-900 leading-snug">
                {headline}
              </div>
              <div className="text-[11px] text-neutral-600 leading-relaxed text-left space-y-2">
                <p>{paragraph1}</p>
                <p>{paragraph2}</p>
              </div>
              <div className="text-xs font-bold font-serif text-neutral-900 pt-2 border-t border-neutral-200">
                {slogan}
              </div>
              <div className="text-[10px] text-neutral-500 pt-2 flex flex-col gap-1">
                <span>📍 {address}</span>
                <span>📞 {phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
