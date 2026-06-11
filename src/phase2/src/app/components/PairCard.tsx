"use client"

import Link from "next/link"

interface PairCardProps {
  symbol: string
  rate: number
  isFavorite: boolean
  onToggle: (symbol: string) => void
}

export default function PairCard({ symbol, rate, isFavorite, onToggle }: PairCardProps) {
  const [base, quote] = symbol.split("-")

  return (
    <Link href={`/pairs/${symbol}`}>
      <div className="bg-white rounded-xl p-5 w-56 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200 border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-gray-900 font-bold text-lg">{base}</span>
            <span className="text-gray-400 text-sm mx-1">/</span>
            <span className="text-gray-600 text-lg">{quote}</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              onToggle(symbol)
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 ${
              isFavorite
                ? "bg-yellow-100 text-yellow-500 hover:bg-yellow-200"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
        <div className="mt-2">
          <p className="text-gray-400 text-xs mb-1">レート</p>
          <p className="text-blue-600 font-bold text-2xl">{rate}</p>
        </div>
      </div>
    </Link>
  )
}