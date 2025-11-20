"use client"

import { useState } from "react"
import { TET_EVENTS } from "@/lib/event-system"

export function EventSwitcher() {
  const [selectedEvent, setSelectedEvent] = useState("tet")

  const events = Object.values(TET_EVENTS)

  return (
    <div className="text-center space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Chọn sự kiện muốn đếm ngược</h2>
        <p className="text-muted-foreground">Xem countdown riêng cho từng sự kiện trong năm</p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => setSelectedEvent(event.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all
              ${
                selectedEvent === event.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border text-foreground hover:border-primary"
              }
            `}
            title={event.description}
          >
            <span className="mr-2">{event.emoji}</span>
            {event.name}
          </button>
        ))}
      </div>
    </div>
  )
}
