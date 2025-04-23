"use client"

import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartPie, ChartLegend } from "@/components/ui/chart"

const data = [
  {
    name: "Áo",
    value: 35,
  },
  {
    name: "Quần",
    value: 25,
  },
  {
    name: "Váy",
    value: 15,
  },
  {
    name: "Phụ kiện",
    value: 15,
  },
  {
    name: "Giày dép",
    value: 10,
  },
]

export function SalesChart() {
  return (
    <Chart className="h-[300px] w-full" data={data} x={(d) => d.name} y={(d) => d.value}>
      <ChartContainer className="p-4">
        <ChartPie />
        <ChartLegend />
        <ChartTooltip>
          <ChartTooltipContent formatValue={(v) => `${v}%`} />
        </ChartTooltip>
      </ChartContainer>
    </Chart>
  )
}

