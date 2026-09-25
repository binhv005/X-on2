"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ProductCard, type Product } from "@/components/ProductCard";
import productsData from "@/data/products.json";
import {
  Star,
  ShieldCheck,
  Zap,
  Truck,
  RotateCcw,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Share2,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const product = (productsData as Product[]).find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const sizes = [
    { label: "XS", desc: "14 · 10 · 11 · 10 · 7 mm" },
    { label: "S", desc: "15 · 11 · 12 · 11 · 8 mm" },
    { label: "M", desc: "16 · 12 · 13 · 12 · 9 mm" },
    { label: "L", desc: "17 · 13 · 14 · 13 · 10 mm" },
  ];

  const relatedProducts = productsData
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(
      {
        id: `${product.id}-${selectedSize}`,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: product.image,
        size: selectedSize,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-neutral-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black">
            Shop
          </Link>
          <span>/</span>
          <span className="text-neutral-800 font-medium truncate max-w-xs">
            {product.title}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Product Images Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-50 border border-gray-100 shadow-sm">
              <Image
                src={product.image || "/images/logolala.webp"}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
              {product.originalPrice && (
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Sale
                </span>
              )}
            </div>

            {/* Thumbnail previews */}
            <div className="grid grid-cols-4 gap-3">
              {[product.image, "/images/logolala.webp"].map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-lg overflow-hidden border-2 border-black/10 cursor-pointer hover:border-black transition-colors"
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info & Purchase Options */}
          <div className="flex flex-col space-y-6">
            <div>
              {product.category && (
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  {product.category}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-gray-950 mt-1 font-serif">
                {product.title}
              </h1>

              {/* Reviews rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  5.0 (Verified Reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-gray-100">
              <span className="text-3xl font-extrabold text-gray-950">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                In Stock &amp; Ready to Ship
              </span>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Select Nail Size
                </label>
                <Link
                  href="/sizing-chart"
                  className="text-xs text-neutral-500 hover:text-black underline font-medium"
                >
                  View Sizing Guide
                </Link>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {sizes.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSelectedSize(s.label)}
                    className={`py-3 px-2 rounded-lg border text-center transition-all ${
                      selectedSize === s.label
                        ? "border-black bg-black text-white shadow-sm"
                        : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
                    }`}
                  >
                    <span className="block text-sm font-bold">{s.label}</span>
                    <span className="block text-[10px] opacity-75 mt-0.5 truncate">
                      {s.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-gray-100 text-gray-600"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 hover:bg-gray-100 text-gray-600"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-md font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-black hover:bg-neutral-800 text-white shadow-lg"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>Zero UV &amp; Drill Damage</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-rose-600" />
                <span>10-Minute Application</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>Reusable 5+ Times</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-rose-600" />
                <span>Free Shipping over $50</span>
              </div>
            </div>

            {/* Product Details & Specs */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                What&apos;s Included
              </h3>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                <li>10 Custom Handmade Press-On Nails</li>
                <li>Lalafolie Cold Gel Adhesive Formulation</li>
                <li>Mini nail buffer &amp; cuticle pusher</li>
                <li>Alcohol prep wipes &amp; instructional guide</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24 pt-12 border-t border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Complete Your Look
            </span>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-gray-950 mt-1">
              You May Also Love
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
