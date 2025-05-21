"use client"

import { cn } from "@/lib/utils"
import { 
  FileText, 
  Users, 
  Calendar, 
  BarChart, 
  Shield, 
  User, 
  UserPlus, 
  LucideIcon 
} from "lucide-react"

type IconName = 
  | "FileText" 
  | "Users" 
  | "Calendar" 
  | "BarChart" 
  | "Shield" 
  | "User" 
  | "UserPlus"

interface StatCardProps {
  title: string
  value: string | number
  iconName: IconName
  description?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export function StatCard({
  title,
  value,
  iconName,
  description,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  // Map icon name to the actual icon component
  const IconComponent = {
    FileText,
    Users,
    Calendar,
    BarChart,
    Shield,
    User,
    UserPlus
  }[iconName];
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md",
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend === "up" && "text-green-600",
                  trend === "down" && "text-red-600",
                  trend === "neutral" && "text-gray-600"
                )}
              >
                {trend === "up" && "↑"}
                {trend === "down" && "↓"}
                {trend === "neutral" && "→"}
                {" "}
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className="rounded-full bg-blue-50 p-3">
          {IconComponent && <IconComponent className="h-6 w-6 text-blue-600" />}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
    </div>
  )
}
