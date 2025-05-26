"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

export default function ProductCategoryChart() {
  const [products] = api.product.getAll.useSuspenseQuery();

  if (products.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Products by Category</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex h-[350px] items-center justify-center">
          No products available
        </CardContent>
      </Card>
    );
  }

  // Count products by category
  const categoryCount = products.reduce<Record<string, number>>(
    (acc, product) => {
      acc[product.kategori] = (acc[product.kategori] || 0) + 1;
      return acc;
    },
    {},
  );

  // Transform data for the chart
  const chartData = Object.entries(categoryCount).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart data={chartData}>
          <XAxis
            dataKey="category"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </CardContent>
    </Card>
  );
}
