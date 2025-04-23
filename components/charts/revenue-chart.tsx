"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartArea,
  ChartLine,
  ChartXAxis,
  ChartYAxis,
  ChartCrosshair,
} from "@/components/ui/chart"

const data = [
  {
    date: "01/03",
    revenue: 4500000,
  },
  {
    date: "02/03",
    revenue: 6200000,
  },
  {
    date: "03/03",
    revenue: 7800000,
  },
  {
    date: "04/03",
    revenue: 5400000,
  },
  {
    date: "05/03",
    revenue: 9200000,
  },
  {
    date: "06/03",
    revenue: 8100000,
  },
  {
    date: "07/03",
    revenue: 10500000,
  },
  {
    date: "08/03",
    revenue: 9800000,
  },
  {
    date: "09/03",
    revenue: 7200000,
  },
  {
    date: "10/03",
    revenue: 8500000,
  },
  {
    date: "11/03",
    revenue: 9100000,
  },
  {
    date: "12/03",
    revenue: 12500000,
  },
]

export function RevenueChart() {
  return (
    <Chart className="h-[300px] w-full" data={data} x={(d) => d.date} y={(d) => d.revenue}>
      <ChartContainer className="p-4">
        <ChartYAxis />
        <ChartXAxis />
        <ChartArea />
        <ChartLine />
        <ChartCrosshair />
        <ChartTooltip>
          <ChartTooltipContent formatValue={(v) => `${v.toLocaleString()}đ`} />
        </ChartTooltip>
      </ChartContainer>
    </Chart>
  )
}

