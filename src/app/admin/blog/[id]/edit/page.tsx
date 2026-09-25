"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPostItem } from "@/types/admin";
import { BlogForm } from "@/components/admin/BlogForm";

export default function AdminBlogEditPage() {
  const params = useParams();
  const id = params?.id as string;
  const [blog, setBlog] = useState<BlogPostItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setBlog(json.data);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <span className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin inline-block" />
        <p className="text-xs text-neutral-500 mt-2">Loading article data...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-24 text-center text-neutral-500">
        Article not found or has been deleted.
      </div>
    );
  }

  return <BlogForm initialData={blog} isEdit={true} />;
}
