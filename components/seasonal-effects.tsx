"use client"

import { useEffect, useState } from "react"
import { getRewards, type UserRewards } from "@/lib/rewards"

interface Particle {
  id: number
  left: number
  delay: number
  duration: number
}

/**
 * Hiển thị các hiệu ứng đã được mở khóa bằng Xu Tết
 * - effect-fireworks  -> dùng MoneyEffect tạm như pháo hoa tiền
 * - effect-lantern    -> dùng FlowerEffect màu vàng như đèn lồng
 */
export function ActiveEffects() {
  const [rewards, setRewards] = useState<UserRewards | null>(null)

  useEffect(() => {
    const r = getRewards()
    setRewards(r)
  }, [])

  if (!rewards) return null

  const unlocked = new Set(rewards.effects)

  return (
    <>
      {unlocked.has("effect-fireworks") && <MoneyEffect />}
      {unlocked.has("effect-lantern") && <FlowerEffect type="apricot" />}
    </>
  )
}

export function SnowEffect() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 10,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"
          style={{
            left: `${particle.left}%`,
            top: "-10px",
            animation: `fall ${particle.duration}s linear ${particle.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) translateX(${(Math.random() - 0.5) * 100}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export function FlowerEffect({ type }: { type: "peach" | "apricot" }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const color = type === "peach" ? "#FFB6C1" : "#FFD700"

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 5 + 8,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: color,
            left: `${particle.left}%`,
            top: "-10px",
            animation: `float-down ${particle.duration}s ease-in ${particle.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-down {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export function MoneyEffect() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 6,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-8 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded opacity-90 flex items-center justify-center text-white text-xs font-bold"
          style={{
            left: `${particle.left}%`,
            top: "-20px",
            animation: `money-fall ${particle.duration}s ease-in ${particle.delay}s infinite`,
          }}
        >
          $
        </div>
      ))}
      <style>{`
        @keyframes money-fall {
          to {
            transform: translateY(100vh) rotateZ(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
