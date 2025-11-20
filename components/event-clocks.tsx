"use client"

import { useEffect, useState } from "react"
import { TET_EVENTS } from "@/lib/event-system"

interface EventCountdown {
  id: string
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function EventClocks() {
  const [countdowns, setCountdowns] = useState<Record<string, EventCountdown>>({})
  const [displayYear, setDisplayYear] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    setDisplayYear(new Date().getFullYear())

    const calculateAllCountdowns = () => {
      const now = new Date()
      const currentYear = new Date().getFullYear()
      const newCountdowns: Record<string, EventCountdown> = {}

      Object.entries(TET_EVENTS).forEach(([eventId, event]) => {
        // Skip Tet since it's shown in main countdown
        if (eventId === "tet") return

        let eventDate = new Date(currentYear, event.solarDate.month - 1, event.solarDate.day)

        // If event has passed this year, target next year
        if (eventDate < now) {
          eventDate = new Date(currentYear + 1, event.solarDate.month - 1, event.solarDate.day)
        }

        const distance = eventDate.getTime() - now.getTime()

        if (distance > 0) {
          newCountdowns[eventId] = {
            id: eventId,
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          }
        }
      })

      setCountdowns(newCountdowns)
    }

    calculateAllCountdowns()
    const interval = setInterval(calculateAllCountdowns, 1000)
    return () => clearInterval(interval)
  }, [])

  const eventsList = Object.entries(TET_EVENTS)
    .filter(([id]) => id !== "tet")
    .sort((a, b) => a[1].solarDate.month - b[1].solarDate.month)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Các sự kiện khác - Năm {displayYear}</h2>
        <p className="text-muted-foreground">Countdown cho những ngày lễ quan trọng khác</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventsList.map(([eventId, event]) => {
          const countdown = countdowns[eventId]
          if (!countdown) return null

          return (
            <div
              key={eventId}
              className={`p-6 rounded-xl border transition-all hover:shadow-lg ${
                eventId === "valentine"
                  ? "bg-gradient-to-br from-pink-50 to-red-50 border-pink-200"
                  : eventId === "hung-kings"
                    ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200"
                    : eventId === "mid-autumn"
                      ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                      : eventId === "christmas"
                        ? "bg-gradient-to-br from-green-50 to-red-50 border-green-200"
                        : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                <span className="text-3xl">{event.emoji}</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: countdown.days, label: "Ngày" },
                  { value: countdown.hours, label: "Giờ" },
                  { value: countdown.minutes, label: "Phút" },
                  { value: countdown.seconds, label: "Giây" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-lg font-bold text-foreground">{String(item.value).padStart(2, "0")}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
