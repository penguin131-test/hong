// Government-approved holiday schedules for Vietnam
export const GOVERNMENT_HOLIDAYS = {
  2024: {
    "Tết Nguyên Đán": { start: "2024-02-08", end: "2024-02-14", days: 7 },
    "Tết Dương Lịch": { start: "2024-01-01", end: "2024-01-01", days: 1 },
    "Lễ Hùng Vương": { start: "2024-04-18", end: "2024-04-18", days: 1 },
    "Quốc Tế Lao Động": { start: "2024-05-01", end: "2024-05-01", days: 1 },
    "Quốc Khánh": { start: "2024-09-02", end: "2024-09-03", days: 2 },
  },
  2025: {
    "Tết Nguyên Đán": { start: "2025-02-29", end: "2025-03-05", days: 7 },
    "Tết Dương Lịch": { start: "2025-01-01", end: "2025-01-01", days: 1 },
    "Lễ Hùng Vương": { start: "2025-04-18", end: "2025-04-18", days: 1 },
    "Quốc Tế Lao Động": { start: "2025-05-01", end: "2025-05-01", days: 1 },
    "Quốc Khánh": { start: "2025-09-02", end: "2025-09-03", days: 2 },
  },
  2026: {
    "Tết Nguyên Đán": { start: "2026-02-17", end: "2026-02-23", days: 7 },
    "Tết Dương Lịch": { start: "2026-01-01", end: "2026-01-01", days: 1 },
    "Lễ Hùng Vương": { start: "2026-04-18", end: "2026-04-18", days: 1 },
    "Quốc Tế Lao Động": { start: "2026-05-01", end: "2026-05-01", days: 1 },
    "Quốc Khánh": { start: "2026-09-02", end: "2026-09-03", days: 2 },
  },
}

export function getHolidaysForYear(year: number) {
  return GOVERNMENT_HOLIDAYS[year as keyof typeof GOVERNMENT_HOLIDAYS] || {}
}
