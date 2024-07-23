"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
const chartData = [
  { state: "chrome", number: 275, fill: "var(--color-chrome)" },
  { state: "safari", number: 200, fill: "var(--color-safari)" },
  { state: "firefox", number: 187, fill: "var(--color-firefox)" },
  { state: "edge", number: 173, fill: "var(--color-edge)" },
  { state: "other", number: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  number: {
    label: "number",
  },
  pending: {
    label: "pending",
    color: "hsl(var(--chart-1))",
  },
  shipped: {
    label: "shipped",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

type PropsType = {
  fulfilled: boolean;
  _count: number
}

export function PieChartLegend({ data }:{ data:PropsType[] }) {

  const filteredData = data.map((element, index) => {
    return {
      state: element.fulfilled ? chartConfig.shipped.label : chartConfig.pending.label,
      number: element._count,
      fill: `var(--color-${element.fulfilled ? 'shipped':'pending'})`
    }
  })

  return (
    <Card className="flex flex-col md:col-span-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Fulfillment Status</CardTitle>
        <CardDescription>Breakdown of Fulfilled and Pending Orders</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={filteredData} dataKey="number" />
            <ChartLegend
              content={<ChartLegendContent nameKey="state" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
