// Enhanced event system with auto-running countdowns
export interface TetEvent {
  id: string
  name: string
  solarDate: { month: number; day: number }
  description: string
  emoji: string
  theme: string
  effect: "none" | "snow" | "flowers" | "money"
  isPrimary?: boolean
}

export const TET_EVENTS: Record<string, TetEvent> = {
  "new-year": {
    id: "new-year",
    name: "Tết Dương Lịch",
    solarDate: { month: 1, day: 1 },
    description: "Ngày đầu năm dương lịch",
    emoji: "🎆",
    theme: "new-year",
    effect: "none",
  },
  valentine: {
    id: "valentine",
    name: "Lễ Tình Yêu",
    solarDate: { month: 2, day: 14 },
    description: "Ngày của những người yêu thương",
    emoji: "💝",
    theme: "valentine",
    effect: "none",
  },
  tet: {
    id: "tet",
    name: "Tết Nguyên Đán",
    solarDate: { month: 2, day: 29 }, // Will be updated dynamically
    description: "Ngày đầu năm âm lịch",
    emoji: "🧧",
    theme: "tet",
    effect: "money",
    isPrimary: true,
  },
  "hung-kings": {
    id: "hung-kings",
    name: "Giỗ Tổ Hùng Vương",
    solarDate: { month: 4, day: 18 },
    description: "Kỷ niệm Vua Hùng",
    emoji: "🏯",
    theme: "tradition",
    effect: "none",
  },
  "mid-autumn": {
    id: "mid-autumn",
    name: "Tết Trung Thu",
    solarDate: { month: 9, day: 15 },
    description: "Lễ hội Trung Thu của trẻ em",
    emoji: "🏮",
    theme: "mid-autumn",
    effect: "lanterns",
  },
  christmas: {
    id: "christmas",
    name: "Giáng Sinh",
    solarDate: { month: 12, day: 25 },
    description: "Lễ Giáng Sinh",
    emoji: "🎄",
    theme: "christmas",
    effect: "snow",
  },
}

export function getUpcomingEvent(currentDate: Date = new Date()): TetEvent {
  const currentYear = currentDate.getFullYear()
  let nextEvent: TetEvent | null = null
  let minDays = Number.POSITIVE_INFINITY

  Object.values(TET_EVENTS).forEach((event) => {
    const eventDate = new Date(currentYear, event.solarDate.month - 1, event.solarDate.day)
    const daysUntil = Math.floor((eventDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntil >= 0 && daysUntil < minDays) {
      minDays = daysUntil
      nextEvent = event
    }
  })

  if (!nextEvent) {
    // If no event this year, return first event of next year
    nextEvent =
      TET_EVENTS[
        Object.keys(TET_EVENTS).sort((a, b) => TET_EVENTS[a].solarDate.month - TET_EVENTS[b].solarDate.month)[0]
      ]
  }

  return nextEvent
}

export function getCountdownToEvent(eventId: string, currentDate: Date = new Date()): number {
  const event = TET_EVENTS[eventId]
  if (!event) return 0

  const currentYear = currentDate.getFullYear()
  let eventDate = new Date(currentYear, event.solarDate.month - 1, event.solarDate.day)

  if (eventDate < currentDate) {
    eventDate = new Date(currentYear + 1, event.solarDate.month - 1, event.solarDate.day)
  }

  return Math.floor((eventDate.getTime() - currentDate.getTime()) / 1000)
}
