"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { TET_EVENTS, getCountdownToEvent } from "@/lib/event-system"

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function EventCountdown({ eventId }: { eventId: string }) {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isActive, setIsActive] = useState(true)
  const event = TET_EVENTS[eventId]

  useEffect(() => {
    const calculateCountdown = () => {
      if (!event) return

      const totalSeconds = getCountdownToEvent(eventId)
      if (totalSeconds <= 0) {
        setIsActive(false)
        return
      }

      setIsActive(true)
      setCountdown({
        days: Math.floor(totalSeconds / (60 * 60 * 24)),
        hours: Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)),
        minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
        seconds: totalSeconds % 60,
      })
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)
    return () => clearInterval(interval)
  }, [eventId])

  if (!event) return null

  if (!isActive) {
    return (
      <Card className="p-6 text-center bg-primary/10 border-primary">
        <p className="text-lg font-semibold text-primary">{event.name} đã qua!</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-foreground">
          <span className="mr-2">{event.emoji}</span>
          {event.name}
        </h3>
        <p className="text-sm text-muted-foreground">{event.description}</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { value: countdown.days, label: "Ngày" },
          { value: countdown.hours, label: "Giờ" },
          { value: countdown.minutes, label: "Phút" },
          { value: countdown.seconds, label: "Giây" },
        ].map((item) => (
          <div key={item.label} className="bg-secondary rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-primary">{String(item.value).padStart(2, "0")}</div>
            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
