"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ChartVariant = "area" | "bar" | "line";

interface DashboardChartProps {
  title: string;
  description: string;
  data: Array<Record<string, string | number>>;
  dataKey: string;
  xKey: string;
  variant?: ChartVariant;
  color?: string;
}

export function DashboardChart({
  title,
  description,
  data,
  dataKey,
  xKey,
  variant = "area",
  color = "var(--primary)",
}: DashboardChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {variant === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                <Tooltip cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : variant === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            ) : (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.16} strokeWidth={3} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
