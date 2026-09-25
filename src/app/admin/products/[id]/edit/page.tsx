"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductItem } from "@/types/admin";
import { ProductForm } from "@/components/admin/ProductForm";

export default function AdminProductEditPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setProduct(json.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <span className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin inline-block" />
        <p className="text-xs text-neutral-500 mt-2">Loading product data...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 text-center text-neutral-500">
        Product not found or has been deleted.
      </div>
    );
  }

  return <ProductForm initialData={product} isEdit={true} />;
}
