"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, CheckCircle2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.0825;
  const total = subtotal + shipping + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckingOut(false);
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-5 bg-neutral-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
          <h1 className="text-2xl font-bold uppercase tracking-tight text-gray-950 font-serif">
            Thank You For Your Order!
          </h1>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your order has been received and is being hand-prepped by our nail artists. You will receive an email confirmation with tracking details shortly.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-gray-950 font-serif">
            Your Shopping Bag
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {items.length === 0
              ? "Your bag is currently empty."
              : `Review your items (${items.length}) before proceeding to checkout.`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <ShoppingBag className="w-16 h-16 text-neutral-300 mx-auto stroke-1" />
            <h2 className="text-lg font-semibold text-gray-900">Your bag is empty</h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Explore our handmade press-ons and cold gel adhesive formulations.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-neutral-800 transition-colors shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List (2 cols) */}
            <div className="lg:col-span-2 divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="py-6 flex gap-6 items-center">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-neutral-50 shrink-0 border border-gray-100">
                    <Image
                      src={item.image || "/images/logolala.webp"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      className="text-sm font-semibold text-gray-950 hover:text-rose-700 line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    {item.size && (
                      <p className="text-xs text-gray-500 mt-0.5">Size: {item.size}</p>
                    )}
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {item.price}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 hover:bg-gray-100 text-gray-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 hover:bg-gray-100 text-gray-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-bold text-gray-950">
                      ${(item.priceNumber * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary (1 col) */}
            <div className="bg-neutral-50 p-6 sm:p-8 rounded-2xl border border-gray-100 space-y-6 h-fit">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-950">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-extrabold text-gray-950">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {!checkingOut ? (
                <button
                  onClick={() => setCheckingOut(true)}
                  className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest rounded-md shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4 pt-2 border-t border-gray-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    Quick Demo Checkout
                  </h3>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-md bg-white focus:outline-hidden"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-md bg-white focus:outline-hidden"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Shipping Address"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-md bg-white focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-widest rounded-md shadow-md transition-colors"
                  >
                    Place Order (${total.toFixed(2)})
                  </button>
                </form>
              )}

              <div className="pt-2 text-[11px] text-gray-500 space-y-1.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-Bit SSL Encrypted &amp; Secure Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
