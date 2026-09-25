"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";
import siteContent from "@/data/site-content.json";
import { type Product } from "@/components/ProductCard";
import { mapApiProduct } from "@/lib/productMapper";
import { Star } from "lucide-react";

export default function HomePage() {
  const [productsList, setProductsList] = useState<Product[]>(() =>
    (productsData as any[]).map(mapApiProduct)
  );

  useEffect(() => {
    async function loadLiveProducts() {
      try {
        const res = await fetch("/api/products?limit=500");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && Array.isArray(json.data.products) && json.data.products.length > 0) {
            setProductsList(json.data.products.map(mapApiProduct));
          }
        }
      } catch (err) {
        console.error("Failed to load live products for homepage:", err);
      }
    }
    loadLiveProducts();
  }, []);

  const handmadeNails = productsList.slice(0, 8);
  const bestSellers = productsList.slice(0, 8);
  const reviews = siteContent.reviews || [];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO VIDEO BANNER (16:9 ratio exactly as Flatsome) */}
      <section className="relative w-full overflow-hidden bg-black aspect-video max-h-[calc(100vh-125px)]">
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          poster="/images/IMG_7101.JPG"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        >
          <source src="/videos/1K34PRO8E_DMCL0D.mp4" type="video/mp4" />
        </video>

        {/* 30% Dark overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Buttons at bottom (y90) */}
        <div className="absolute bottom-6 sm:bottom-12 inset-x-0 z-10 flex items-center justify-start max-w-7xl mx-auto px-6 sm:px-12 gap-3 sm:gap-4">
          <Link
            href="/shop"
            className="px-6 sm:px-8 py-2.5 sm:py-3.5 border-2 border-white text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-black transition-colors shadow-lg"
          >
            SHOP NOW
          </Link>
          <a
            href="tel:+16892128888"
            className="px-6 sm:px-8 py-2.5 sm:py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors shadow-lg"
          >
            CALL NOW
          </a>
        </div>
      </section>

      {/* 2. THREE-VIDEO FULL-WIDTH STRIP - FLUSH / ZERO GAP */}
      <section className="w-full bg-black overflow-hidden p-0 m-0">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 p-0 m-0">
          {/* Video 1 */}
          <div className="relative aspect-[9/16] w-full overflow-hidden bg-black pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              poster="/images/IMG_7098.JPG"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            >
              <source src="/videos/1K34PRO84_DMCL0D.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Video 2 */}
          <div className="relative aspect-[9/16] w-full overflow-hidden bg-black pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              poster="/images/IMG_7099.JPG"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            >
              <source src="/videos/1K34PRO8K_DMCL0D.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Video 3 */}
          <div className="relative aspect-[9/16] w-full overflow-hidden bg-black pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              poster="/images/IMG_7100.JPG"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            >
              <source src="/videos/1K34PRO8E_DMCL0D.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* 3. SECTION: HANDMADE GRIP-X NAILS (Color 1: Blush Pink #faece9 with Floral & Tool Motifs) */}
      <section className="relative py-14 sm:py-20 bg-[#faece9] border-t border-b border-[#f3dedb] w-full overflow-hidden">
        {/* Background Decorative Motifs */}
        <div className="absolute -top-10 -left-10 w-48 h-48 sm:w-64 sm:h-64 opacity-30 pointer-events-none select-none rotate-[-15deg]">
          <Image
            src="/images/decorations/rose-bloom.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute top-1/4 -right-10 w-56 h-56 sm:w-72 sm:h-72 opacity-30 pointer-events-none select-none rotate-12">
          <Image
            src="/images/decorations/daisy-cluster.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute -bottom-8 -left-6 w-36 h-36 sm:w-48 sm:h-48 opacity-25 pointer-events-none select-none rotate-[-20deg]">
          <Image
            src="/images/decorations/gold-scissors.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute -bottom-10 right-4 sm:right-10 w-36 h-44 sm:w-48 sm:h-56 opacity-25 pointer-events-none select-none rotate-15">
          <Image
            src="/images/decorations/polish-bottle.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-gray-900 font-serif">
              HANDMADE GRIP-X NAILS
            </h1>
            <div className="w-12 h-0.5 bg-rose-400 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {handmadeNails.map((prod) => (
              <div key={prod.id} className="group flex flex-col bg-white rounded-lg p-3 shadow-xs border border-[#eedad7] hover:shadow-md transition-shadow">
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 rounded-md">
                  <Link href={`/product/${prod.slug}`}>
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <div className="py-3 text-center">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide truncate">
                    <Link href={`/product/${prod.slug}`}>{prod.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
                    {prod.price}
                  </p>
                  <div className="mt-2.5">
                    <Link
                      href={`/product/${prod.slug}`}
                      className="inline-block w-full py-2 border border-black hover:bg-black hover:text-white text-[11px] font-bold uppercase tracking-wider text-black rounded-sm transition-colors"
                    >
                      Select Options
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. SECTION: BEST SELLER (Color 2: Pure White #ffffff with Brush, Daisies & Stars Motifs) */}
      <section className="relative py-14 sm:py-20 bg-white w-full overflow-hidden">
        {/* Background Decorative Motifs */}
        <div className="absolute top-8 -left-8 w-52 h-52 sm:w-68 sm:h-68 opacity-25 pointer-events-none select-none rotate-12">
          <Image
            src="/images/decorations/petals-scatter.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute top-1/4 right-2 sm:right-8 w-36 h-48 sm:w-48 sm:h-64 opacity-25 pointer-events-none select-none rotate-[35deg]">
          <Image
            src="/images/decorations/pink-brush.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute -bottom-8 -left-6 w-48 h-48 sm:w-60 sm:h-60 opacity-25 pointer-events-none select-none rotate-[-10deg]">
          <Image
            src="/images/decorations/daisy-rose-sprig.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute -bottom-8 -right-8 w-44 h-44 sm:w-56 sm:h-56 opacity-25 pointer-events-none select-none rotate-[-15deg]">
          <Image
            src="/images/decorations/gold-stars.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-gray-900 font-serif">
              Best seller
            </h1>
            <div className="w-12 h-0.5 bg-neutral-300 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((prod, idx) => (
              <div key={prod.id} className="group flex flex-col bg-white rounded-lg p-3 shadow-xs border border-gray-100 hover:shadow-md transition-shadow">
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 rounded-md">
                  <span className="absolute top-2 left-2 z-10 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {idx % 2 === 0 ? "17% OFF" : "25% OFF"}
                  </span>
                  <Link href={`/product/${prod.slug}`}>
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <div className="py-3 text-center">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide truncate">
                    <Link href={`/product/${prod.slug}`}>{prod.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
                    {prod.price}
                  </p>
                  <div className="mt-2.5">
                    <Link
                      href={`/product/${prod.slug}`}
                      className="inline-block w-full py-2 border border-black hover:bg-black hover:text-white text-[11px] font-bold uppercase tracking-wider text-black rounded-sm transition-colors"
                    >
                      Select Options
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION: OUR REVIEWS (Color 1: Blush Pink #faece9 with Daisy & Scissors Motifs) */}
      <section className="relative py-16 bg-[#faece9] border-t border-b border-[#f3dedb] w-full overflow-hidden">
        {/* Background Decorative Motifs */}
        <div className="absolute -top-10 -right-10 w-52 h-52 sm:w-68 sm:h-68 opacity-25 pointer-events-none select-none rotate-20">
          <Image
            src="/images/decorations/rose-bloom.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute top-1/3 -left-8 w-44 h-44 sm:w-56 sm:h-56 opacity-25 pointer-events-none select-none rotate-[-15deg]">
          <Image
            src="/images/decorations/chamomile-sprig.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute -bottom-8 -right-8 w-36 h-36 sm:w-48 sm:h-48 opacity-20 pointer-events-none select-none rotate-[-25deg]">
          <Image
            src="/images/decorations/gold-scissors.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute -bottom-8 left-10 w-52 h-52 sm:w-68 sm:h-68 opacity-25 pointer-events-none select-none -rotate-12">
          <Image
            src="/images/decorations/petals-scatter.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-gray-900 font-serif">
              Our Reviews
            </h1>
            <div className="flex items-center justify-center gap-1 mt-2">
              <span className="text-xs font-bold text-gray-800">EXCELLENT</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-gray-500">Based on Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev: { text: string; author: string; date: string }, idx: number) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-[#eedad7] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">{rev.author}</span>
                  <span className="text-gray-400">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION: SHOP US IRL */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="relative w-full">
          <Image
            src="/images/1-2.png"
            alt="Shop US GIRL"
            width={1024}
            height={460}
            priority
            className="w-full h-auto block"
            quality={100}
            unoptimized
          />
          <div className="absolute inset-0 flex items-start justify-end px-6 sm:px-12 md:px-16 lg:px-24 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pointer-events-none">
            <div className="text-right space-y-3 sm:space-y-4 pointer-events-auto">
              <h2 className="whitespace-nowrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-black font-sans">
                SHOP US IRL
              </h2>
              <div>
                <a
                  href="https://www.google.com/maps/place/3168+Bill+Beck+Blvd,+Kissimmee,+FL+34744,+Hoa+K%E1%BB%B3/@28.3421851,-81.384924,96m/data=!3m1!1e3!4m6!3m5!1s0x88dd86f7f805bafd:0x719187b51bbcb7ff!8m2!3d28.3423066!4d-81.3845875!16s%2Fg%2F11bw40bzvw!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-7 py-3 bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  FIND US
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
