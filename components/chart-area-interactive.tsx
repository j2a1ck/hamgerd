"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartData = [
  { date: "1403/01/01", tickets: 12, events: 3 },
  { date: "1403/01/02", tickets: 8, events: 2 },
  { date: "1403/01/03", tickets: 15, events: 4 },
  { date: "1403/01/04", tickets: 22, events: 6 },
  { date: "1403/01/05", tickets: 18, events: 5 },
  { date: "1403/01/06", tickets: 25, events: 7 },
  { date: "1403/01/07", tickets: 20, events: 5 },
  { date: "1403/01/08", tickets: 30, events: 8 },
  { date: "1403/01/09", tickets: 16, events: 4 },
  { date: "1403/01/10", tickets: 28, events: 7 },
  { date: "1403/01/11", tickets: 35, events: 9 },
  { date: "1403/01/12", tickets: 24, events: 6 },
  { date: "1403/01/13", tickets: 32, events: 8 },
  { date: "1403/01/14", tickets: 19, events: 5 },
  { date: "1403/01/15", tickets: 27, events: 7 },
];

const chartConfig = {
  visitors: {
    label: "فعالیت‌ها",
  },
  tickets: {
    label: "بلیط‌ها",
    color: "hsl(142 76% 36%)",
  },
  events: {
    label: "رویدادها",
    color: "hsl(160 60% 45%)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item, index) => {
    let itemsToShow = 15;
    if (timeRange === "30d") {
      itemsToShow = 15;
    } else if (timeRange === "7d") {
      itemsToShow = 7;
    }
    return index < itemsToShow;
  });

  return (
    <Card className="@container/card hamgerd-card">
      <CardHeader className="relative">
        <CardTitle>فعالیت‌های اخیر</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">آمار ۳ ماه گذشته</span>
          <span className="@[540px]/card:hidden">۳ ماه گذشته</span>
        </CardDescription>
        <div className="absolute left-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              ۳ ماه گذشته
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              ۳۰ روز گذشته
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              ۷ روز گذشته
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="انتخاب بازه زمانی"
            >
              <SelectValue placeholder="۳ ماه گذشته" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                ۳ ماه گذشته
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                ۳۰ روز گذشته
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                ۷ روز گذشته
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTickets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-tickets)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-tickets)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-events)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-events)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                return value.split("/").slice(1).join("/");
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return value;
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="events"
              type="natural"
              fill="url(#fillEvents)"
              stroke="var(--color-events)"
              stackId="a"
            />
            <Area
              dataKey="tickets"
              type="natural"
              fill="url(#fillTickets)"
              stroke="var(--color-tickets)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
