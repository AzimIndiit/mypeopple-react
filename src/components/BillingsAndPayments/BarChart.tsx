
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
const chartData = [
  { month: "January", basic: 1896, invest: 5800 },
  { month: "February", basic: 3025, invest: 2000 },
  { month: "March", basic: 2337, invest: 1230 },
  { month: "April", basic: 7453, invest: 1920 },
  { month: "May", basic: 2209, invest: 1310 },
  { month: "June", basic: 2214, invest: 1140 },

]

const chartConfig = {
  basic: {
    label: "Basic",
    color: "hsl(var(--chart-1))",
  },
  invest: {
    label: "Invest",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BarChartComponent() {
  return (
    <Card className="w-full shadow-none border-1 border-[#EEEEEE] rounded-[16px] h-full">
      <CardHeader>
        <CardTitle className="text-[14px] font-primary font-medium">Monthly billings</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig} className=" ml-[-35px]">
          <BarChart accessibilityLayer data={chartData}>
          <YAxis
            label={{ value: '', angle: -90, position: 'center' }}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `${value >= 1000 ? `${value / 1000}K` : value}`}
          />
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="basic" fill="#FC4006" radius={4} />
            <Bar dataKey="invest" fill="#FF9165" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
