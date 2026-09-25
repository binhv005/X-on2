"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Building2, CheckCircle2, ArrowRight } from "lucide-react";

export default function WholesaleSignupPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Partner with X-ON
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-gray-950 font-serif">
            Wholesale Account Application
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
            Become an official retailer or salon partner of X-ON&apos;s handmade press-on nails and professional nail essentials.
          </p>
        </div>

        {/* Benefits banner */}
        <div className="bg-neutral-50 rounded-2xl p-6 border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-xl font-bold text-gray-950">40–60%</span>
            <p className="text-xs text-gray-500 mt-1">Wholesale Margins</p>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-950">Low MOQ</span>
            <p className="text-xs text-gray-500 mt-1">Flexible Starter Kits</p>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-950">Fast Shipping</span>
            <p className="text-xs text-gray-500 mt-1">US-Based Stock</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold uppercase text-gray-950">
                Application Submitted!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you for applying for an X-ON wholesale account. Our wholesale accounts manager will review your business credentials and contact you within 1–2 business days.
              </p>
              <Link
                href="/shop"
                className="inline-block mt-4 px-6 py-2.5 bg-black text-white text-xs uppercase font-semibold tracking-wider rounded-full hover:bg-neutral-800 transition-colors"
              >
                Return to Shop
              </Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-md focus:outline-hidden focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Boutique / Salon Name"
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-md focus:outline-hidden focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="orders@business.com"
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-md focus:outline-hidden focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-md focus:outline-hidden focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Website or Social Handle
                  </label>
                  <input
                    type="text"
                    placeholder="instagram.com/yoursalon"
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-md focus:outline-hidden focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Tax ID / Reseller Permit #
                  </label>
                  <input
                    type="text"
                    placeholder="Tax ID Number"
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-md focus:outline-hidden focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Business Details &amp; Estimated Volume
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your store, client base, and the product lines you are interested in..."
                  className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-md focus:outline-hidden focus:border-black resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest rounded-md shadow-md transition-colors"
              >
                Submit Wholesale Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
