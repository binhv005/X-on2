"use client";


import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import siteContent from "@/data/site-content.json";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";

export default function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  image?: string;
  paragraphs?: string[];
  excerpt?: string;
}

  const post = siteContent.blogPosts?.find((p: BlogPost) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const otherPosts = siteContent.blogPosts?.filter((p: BlogPost) => p.slug !== slug).slice(0, 2);

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-gray-950 font-serif leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Feature Cover Image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-neutral-100">
          <Image
            src={post.image || "/images/logo-xon.png"}
            alt={post.title}
            fill
            priority
            unoptimized
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/logo-xon.png";
            }}
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-neutral max-w-none space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          {post.paragraphs?.map((para: string, idx: number) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* CTA Banner inside post */}
        <div className="bg-neutral-50 rounded-2xl p-8 border border-gray-100 text-center space-y-4">
          <h3 className="text-lg font-bold uppercase tracking-tight text-gray-900">
            Ready to Upgrade Your Nail Routine?
          </h3>
          <p className="text-xs text-gray-600 max-w-lg mx-auto">
            Experience the salon revolution with X-ON&apos;s handmade sets and professional nail essentials.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-colors shadow-md"
          >
            Explore Styles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Read More */}
        {otherPosts && otherPosts.length > 0 && (
          <div className="pt-12 border-t border-gray-100 space-y-6">
            <h3 className="text-base font-bold uppercase tracking-wider text-gray-950">
              More from the Journal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((op: BlogPost) => (
                <Link
                  key={op.slug}
                  href={`/blog/${op.slug}`}
                  className="group block p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all"
                >
                  <p className="text-xs text-neutral-400 mb-1">{op.date}</p>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-rose-700 transition-colors line-clamp-2">
                    {op.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
