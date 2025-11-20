"use client"

export type RewardType = "view_todo" | "share_site"

export interface DailyRewardsFlags {
  view_todo: boolean
  share_site: boolean
}

export interface UserRewards {
  xu: number
  streak: number
  lastCheckInDate: string | null
  checkedInToday: boolean
  lastResetDate: string | null
  rewards: DailyRewardsFlags
  effects: string[]       // danh sách hiệu ứng đã mở khóa
  themes: string[]        // danh sách theme đã mở khóa
}

const STORAGE_KEY = "tet_rewards_v1"

const REWARD_XU: Record<RewardType, number> = {
  view_todo: 10,
  share_site: 20,
}

const THEME_COSTS: Record<string, number> = {
  "theme-peach": 300,
  "theme-apricot": 300,
}

const EFFECT_COSTS: Record<string, number> = {
  "effect-fireworks": 500,
  "effect-lantern": 500,
}

function todayStr(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function loadRaw(): UserRewards | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as UserRewards
  } catch {
    return null
  }
}

function save(rewards: UserRewards) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rewards))
}

function createInitial(): UserRewards {
  const today = todayStr()
  return {
    xu: 0,
    streak: 0,
    lastCheckInDate: null,
    checkedInToday: false,
    lastResetDate: today,
    rewards: {
      view_todo: false,
      share_site: false,
    },
    effects: [],
    themes: [],
  }
}

/**
 * Reset nhiệm vụ/ngày nếu sang ngày mới
 */
function ensureInitializedAndReset(): UserRewards {
  let data = loadRaw()

  if (!data) {
    data = createInitial()
    save(data)
    return data
  }

  const today = todayStr()

  // Nếu khác ngày reset cuối -> reset nhiệm vụ/ngày
  if (data.lastResetDate !== today) {
    // checkedInToday = true nếu hôm nay đã check-in rồi,
    // ngược lại reset về false
    data.checkedInToday =
      data.lastCheckInDate !== null && data.lastCheckInDate === today

    data.rewards = {
      view_todo: false,
      share_site: false,
    }
    data.lastResetDate = today

    save(data)
  }

  return data
}

/**
 * Lấy trạng thái Lộc Tết hiện tại (đã auto reset theo ngày)
 */
export function getRewards(): UserRewards {
  const data = ensureInitializedAndReset()
  return data
}

/**
 * Điểm danh hằng ngày – tự tăng streak, cộng Xu theo streak
 * Trả về:
 *  - isNewStreak: có điểm danh mới hay không
 *  - xu: tổng xu sau khi điểm danh
 *  - rewardXu: số xu nhận được lần này (optional, UI không bắt buộc)
 */
export function dailyCheckIn(): { isNewStreak: boolean; xu: number; rewardXu: number } {
  let data = ensureInitializedAndReset()
  const today = todayStr()

  // Đã điểm danh hôm nay
  if (data.checkedInToday && data.lastCheckInDate === today) {
    return { isNewStreak: false, xu: data.xu, rewardXu: 0 }
  }

  // Tính xem hôm qua là ngày nào
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yYear = yesterday.getFullYear()
  const yMonth = String(yesterday.getMonth() + 1).padStart(2, "0")
  const yDay = String(yesterday.getDate()).padStart(2, "0")
  const yesterdayStr = `${yYear}-${yMonth}-${yDay}`

  // Nếu điểm danh liên tiếp -> +1 streak, ngược lại reset streak = 1
  if (data.lastCheckInDate === yesterdayStr) {
    data.streak = (data.streak || 0) + 1
  } else {
    data.streak = 1
  }

  // Xu nhận được: 100 * streak, nhưng tối đa 5 lần nhân (giống UI hiển thị)
  const rewardXu = 100 * Math.min(data.streak, 5)

  data.xu += rewardXu
  data.lastCheckInDate = today
  data.checkedInToday = true
  data.lastResetDate = today

  save(data)
  return { isNewStreak: true, xu: data.xu, rewardXu }
}

/**
 * Nhận thưởng nhiệm vụ theo ngày (xem checklist, chia sẻ...)
 */
export function claimReward(rewardType: RewardType): { success: boolean; xu: number } {
  let data = ensureInitializedAndReset()

  if (data.rewards[rewardType]) {
    // Hôm nay đã nhận thưởng này rồi
    return { success: false, xu: data.xu }
  }

  const plus = REWARD_XU[rewardType] ?? 0
  data.rewards[rewardType] = true
  data.xu += plus

  save(data)
  return { success: true, xu: data.xu }
}

/**
 * Mở khóa theme bằng Xu
 */
export function unlockTheme(themeId: string): { success: boolean; xu: number } {
  let data = ensureInitializedAndReset()

  if (data.themes.includes(themeId)) {
    // Đã mở trước đó rồi -> coi như thành công, không trừ thêm Xu
    return { success: true, xu: data.xu }
  }

  const cost = THEME_COSTS[themeId] ?? 300
  if (data.xu < cost) {
    return { success: false, xu: data.xu }
  }

  data.xu -= cost
  data.themes.push(themeId)

  save(data)
  return { success: true, xu: data.xu }
}

/**
 * Mở khóa hiệu ứng bằng Xu
 */
export function unlockEffect(effectId: string): { success: boolean; xu: number } {
  let data = ensureInitializedAndReset()

  if (data.effects.includes(effectId)) {
    // Đã mở sẵn
    return { success: true, xu: data.xu }
  }

  const cost = EFFECT_COSTS[effectId] ?? 500
  if (data.xu < cost) {
    return { success: false, xu: data.xu }
  }

  data.xu -= cost
  data.effects.push(effectId)

  save(data)
  return { success: true, xu: data.xu }
}
