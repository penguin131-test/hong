"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { EventCountdown } from "@/components/event-countdown"
import { TET_EVENTS } from "@/lib/event-system"

export default function CountdownPage() {
  const [selectedEventId, setSelectedEventId] = useState("tet")

  const events = Object.values(TET_EVENTS).sort((a, b) => {
    const aMonth = a.solarDate.month
    const bMonth = b.solarDate.month
    return aMonth - bMonth
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary mb-2">Đếm Ngược Sự Kiện</h1>
          <p className="text-lg text-muted-foreground">Chọn một sự kiện để xem đếm ngược chi tiết</p>
        </div>

        {/* Event Selector */}
        <div className="flex flex-wrap gap-2 justify-center">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all text-sm
                ${
                  selectedEventId === event.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:border-primary"
                }
              `}
            >
              <span className="mr-1">{event.emoji}</span>
              {event.name}
            </button>
          ))}
        </div>

        {/* Main Countdown */}
        <EventCountdown eventId={selectedEventId} />

        {/* All Events Overview */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Tất Cả Sự Kiện</h2>
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary cursor-pointer transition-colors"
                onClick={() => setSelectedEventId(event.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{event.emoji}</span>
                  <div>
                    <p className="font-semibold text-foreground">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.solarDate.day}/{event.solarDate.month}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-primary font-medium">{event.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}
