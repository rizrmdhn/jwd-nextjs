"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from "@/trpc/react";

export default function CardSection() {
  const [productCount] = api.product.getCount.useSuspenseQuery();

  return (
    <Card className="mt-4 max-w-sm p-6">
      <CardHeader>Total Produk</CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{productCount}</p>
        <p className="text-muted-foreground">Jumlah produk yang tersedia.</p>
      </CardContent>
    </Card>
  );
}
