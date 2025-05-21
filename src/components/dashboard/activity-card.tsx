"use client"

import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  title: string
  time: string
  description?: string
  status?: "completed" | "pending" | "failed"
}

interface ActivityCardProps {
  title: string
  activities: ActivityItem[]
  className?: string
}

export function ActivityCard({
  title,
  activities,
  className,
}: ActivityCardProps) {
  return (
    <div className={cn(
      "rounded-xl bg-white p-6 shadow-sm",
      className
    )}>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="relative mt-1">
              <div className={cn(
                "h-3 w-3 rounded-full",
                activity.status === "completed" && "bg-green-500",
                activity.status === "failed" && "bg-red-500",
                activity.status === "pending" || !activity.status ? "bg-blue-500" : ""
              )} />
              {activities.indexOf(activity) !== activities.length - 1 && (
                <div className="absolute left-1.5 top-3 h-full w-px -translate-x-1/2 bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              {activity.description && (
                <p className="mt-1 text-sm text-gray-500">{activity.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
