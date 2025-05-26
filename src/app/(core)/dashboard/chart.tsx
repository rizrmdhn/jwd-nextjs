"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { api } from "@/trpc/react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

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

  // Transform data for the chart
  const chartData = products.map((item) => ({
    name: item.produk,
    value: item.stok,
  }));

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[300px] min-h-0 w-full overflow-x-auto md:h-[400px]"
          config={chartConfig}
          // title="Top 5 Hasil Test Fisik"
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              fill="var(--color-desktop)"
            >
              <LabelList
                position="top"
                offset={12}
                fill="var(--color-desktop)"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
