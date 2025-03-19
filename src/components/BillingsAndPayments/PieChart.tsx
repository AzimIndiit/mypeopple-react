
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
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
  { browser: "average", visitors: 275, fill: "#FF9165" },
  { browser: "extra", visitors: 200, fill: "#FC4006" },
  { browser: "services", visitors: 187, fill: "#000000" },

]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  average: {
    label: "Average",
    color: "hsl(var(--chart-1))",
  },
  extra: {
    label: "Extra",
    color: "hsl(var(--chart-2))",
  },
  services: {
    label: "Services",
    color: "hsl(var(--chart-3))",
  },
  
} satisfies ChartConfig

export function PieChartComponent() {
  return (
    <Card className="w-full shadow-none border-1 border-[#EEEEEE] rounded-[16px] flex flex-col h-full ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-[14px] font-primary font-medium">By sort services</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart >
            <Pie data={chartData} dataKey="visitors" stroke="white"  strokeWidth={5} />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
