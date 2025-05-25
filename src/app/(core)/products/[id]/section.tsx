/* eslint-disable @next/next/no-img-element */

"use client";

import { env } from "@/env";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function DetailSection() {
  const { id } = useParams<{ id: string }>();

  const [product] = api.product.getById.useSuspenseQuery({
    id,
  });

  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <img
            src={env.NEXT_PUBLIC_APP_URL + product.fotoUrl}
            alt={product.produk}
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{product.produk}</h1>
            <p className="text-muted-foreground text-sm">{product.kategori}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Rp {product.price.toLocaleString()}
            </h2>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
