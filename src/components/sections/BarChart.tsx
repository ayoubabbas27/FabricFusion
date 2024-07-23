"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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
import { User } from "@prisma/client"
import { formatDate } from "@/lib/formatters"

const chartData = [
  { month: "January", users: 186 },
  { month: "February", users: 305 },
  { month: "March", users: 237 },
  { month: "April", users: 73 },
  { month: "May", users: 209 },
  { month: "June", users: 214 },
]

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

type UserGroupByResult = {
  createdAt: Date; 
  _count: number
};
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

export function DashboardBarChart({data}:{data: UserGroupByResult[]}) {

  const filteredData = data.map((elem) => {
    return {
      month: extractMonth(formatDate(elem.createdAt.toString())),
      users: elem._count
    }
  }) 

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Number of Active Users Over the Last 6 Months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={filteredData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="users" fill="var(--color-users)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total users for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
