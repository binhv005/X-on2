"use client";

import React, { use } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import productsData from "@/data/products.json";

const themeDescriptions: Record<string, { title: string; desc: string }> = {
  "3d": {
    title: "3D Nail Art & Sculpted Luxury",
    desc: "Dimensional nail jewels, textured ribbons, pearls, and handcrafted relief art.",
  },
  "flower": {
    title: "Floral & Botanical Themes",
    desc: "Hand-painted blossoms, petals, and nature-inspired elegance for any occasion.",
  },
  "y2k": {
    title: "Y2K Aesthetic & Cyberpunk Glam",
    desc: "Chrome finishes, futuristic metallics, bold graphics, and nostalgic retro charms.",
  },
};

export default function DesignThemeCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const info = themeDescriptions[slug] || {
    title: `${slug.toUpperCase()} Theme`,
    desc: "Discover our specialized nail art theme collection.",
  };

  const filtered = productsData.filter((p) => {
    return (
      p.title.toLowerCase().includes(slug.toLowerCase()) ||
      p.category?.toLowerCase().includes(slug.toLowerCase()) ||
      p.slug.toLowerCase().includes(slug.toLowerCase())
    );
  });

  // Fallback to general list if filter produces few
  const displayProducts = filtered.length > 0 ? filtered : productsData.slice(0, 12);

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs text-neutral-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black">
            Shop
          </Link>
          <span>/</span>
          <span className="text-neutral-800 font-medium">{info.title}</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Design Theme
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-950 mt-1 font-serif">
            {info.title}
          </h1>
          <p className="text-sm text-gray-500 mt-2">{info.desc}</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
