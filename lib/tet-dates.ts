export const TET_DATES = {
  2024: new Date("2024-02-10T00:00:00"),
  2025: new Date("2025-01-29T00::00"),
  2026: new Date("2025-02-17T00:00:00"),
  2027: new Date("2027-02-06T00:00:00"),
  2028: new Date("2028-01-26T00:00:00"),
}

export function getTetDateForYear(year: number): Date {
  return (TET_DATES as any)[year] || new Date()
}

export function getCurrentTetDate(): Date {
  const now = new Date()
  const currentYear = now.getFullYear()

  const tetThisYear = getTetDateForYear(currentYear)
  if (now < tetThisYear) {
    return tetThisYear
  }

  return getTetDateForYear(currentYear + 1)
}
