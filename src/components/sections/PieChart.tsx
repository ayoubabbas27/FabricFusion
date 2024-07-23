"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  sales: {
    label: "Sales",
  },
  fr: {
    label: "France",
    color: "hsl(var(--chart-1))",
  },
  us: {
    label: "United States",
    color: "hsl(var(--chart-2))",
  },
  jp: {
    label: "Japan",
    color: "hsl(var(--chart-3))",
  },
  uae: {
    label: "United Arab Emirates",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

type SalesByCountry = {
  country: string;
  _count: {
    country: number;
  };
};

export function DashboardPieChart({ data }: { data: SalesByCountry[]}) {

  const totalSales: number = data.reduce((acc: number, curr: SalesByCountry)=>{
    acc = acc + curr._count.country;
    return acc;
  },0);

  const filteredData = data.reduce((acc: {country: string, sales: number, fill: string}[], curr: SalesByCountry) => {
    acc.push({
      country: curr.country,
      sales: curr._count.country,
      fill: `hsl(var(--chart-${acc.length+1}))`
    })
    return acc;
  },[]);

  return (
    <Card className="flex flex-col md:col-span-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sales Distribution by Country</CardTitle>
        <CardDescription>Breakdown of Sales Across Different Countries</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={filteredData}
              dataKey="sales"
              nameKey="country"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSales}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Sales
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
