"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
import { Order } from "@prisma/client"
import { formatDate } from "@/lib/formatters"
const chartData = [
  { month: "January", sales: 186 },
  { month: "February", sales: 305 },
  { month: "March", sales: 237 },
  { month: "April", sales: 73 },
  { month: "May", sales: 209 },
  { month: "June", sales: 214 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function extractMonth(date: string): string {
  const monthAbr = date.split("-")[1].toLowerCase();

  switch (monthAbr) {
    case "jan":
      return "January";
    case "feb":
      return "February";
    case "mar":
      return "March";
    case "apr":
      return "April";
    case "may":
      return "May";
    case "jun":
      return "June";
    case "jul":
      return "July";
    case "aug":
      return "August";
    case "sep":
      return "September";
    case "oct":
      return "October";
    case "nov":
      return "November";
    case "dec":
      return "December";
    default:
      return "Invalid month";
  }
}

type MonthNumberType ={
  [key: string]: number
}
export function AriaChart({ data }:{ data: Order[]}) {

  const salesData: MonthNumberType = data.reduce((acc: MonthNumberType, curr: Order) => {
    const month = extractMonth(formatDate(curr.createdAt.toString()));
    if (acc[month]){
      acc[month]++;
    }else{
      acc[month] = 1;
    }
    return acc;
  },{});

  const filteredData = Object.keys(salesData).map((key: string) => {
    return {month: key , sales: salesData[key]}
  })


  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          Showing total sales for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="var(--color-sales)"
              fillOpacity={0.4}
              stroke="var(--color-sales)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
