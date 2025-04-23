"use client"

import type * as React from "react"

export const ChartContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={className} {...props} />
}

export const ChartTooltip = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>{children}</div>
}

export const ChartTooltipContent = ({ formatValue }: { formatValue?: (value: number) => string }) => {
  return <div>{formatValue ? formatValue(12345) : "12345"}</div>
}

export const Chart = ({
  className,
  data,
  x,
  y,
  children,
}: { className?: string; data: any[]; x: (d: any) => string; y: (d: any) => number; children: React.ReactNode }) => {
  return <div className={className}>{children}</div>
}

export const ChartArea = () => {
  return null
}

export const ChartLine = () => {
  return null
}

export const ChartXAxis = () => {
  return null
}

export const ChartYAxis = () => {
  return null
}

export const ChartCrosshair = () => {
  return null
}

export const ChartPie = () => {
  return null
}

export const ChartLegend = () => {
  return null
}

