"use client"

import { useEffect, useState } from "react"
import { useFavorites } from "@/hooks/useFavorites"
import Link from "next/link"

async function getRate(from: string, to: string): Promise<number> {
  const response = await fetch(`/api/rate?from=${from}&to=${to}`)
  const data = await response.json()
  return data.rate
}

interface PairWithRate {
  symbol: string
  rate: number
}

export default function FavoritesPage() {
  const { favorites, initialized } = useFavorites()
  const [pairList, setPairList] = useState<PairWithRate[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!initialized) return
    if (favorites.length === 0) {
      setPairList([])
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    Promise.all(
      favorites.map(async (symbol) => {
        const [from, to] = symbol.split("-")
        const rate = await getRate(from, to)
        return { symbol, rate }
      })
    )
      .then(results => setPairList(results))
      .catch(() => setError("レートの取得に失敗しました"))
      .finally(() => setIsLoading(false))
  }, [favorites, initialized])

  if (!initialized || isLoading) return (
    <main className="p-8">
      <p className="text-gray-400">読み込み中…</p>
    </main>
  )
  if (error) return (
    <main className="p-8">
      <p className="text-red-500">{error}</p>
    </main>
  )

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">お気に入り一覧</h1>
        <Link href="/" className="text-blue-600 text-sm hover:underline">← 一覧に戻る</Link>
      </div>
      {pairList.length === 0 ? (
        <p className="text-gray-400 mt-4">お気に入りが登録されていません</p>
      ) : (
        <div className="flex gap-4">
          {pairList.map((pair) => {
            const [base, quote] = pair.symbol.split("-")
            return (
              <div key={pair.symbol} className="bg-white rounded-xl p-5 w-56 border border-gray-100 shadow-sm">
                <div className="mb-3">
                  <span className="text-gray-900 font-bold text-lg">{base}</span>
                  <span className="text-gray-400 text-sm mx-1">/</span>
                  <span className="text-gray-600 text-lg">{quote}</span>
                </div>
                <p className="text-gray-400 text-xs mb-1">レート</p>
                <p className="text-blue-600 font-bold text-2xl">{pair.rate}</p>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}