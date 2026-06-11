import Link from "next/link"

interface PageProps {
  params: Promise<{
    symbol: string
  }>
}

interface RateData {
  amount: number
  base: string
  date: string
  rates: { [key: string]: number }
}

async function getRate(from: string, to: string): Promise<RateData> {
  const res = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
  return res.json()
}

export default async function PairDetailPage({ params }: PageProps) {
  const { symbol } = await params
  const [from, to] = symbol.split("-")
  const data = await getRate(from, to)
  const rate = data.rates[to]

  return (
    <main className="p-8">
        <Link href="/" className="inline-flex items-center gap-1 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150 mb-6">
            ← 一覧に戻る
        </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {from}
        <span className="text-gray-400 text-2xl mx-2">/</span>
        {to}
      </h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-72">
        <p className="text-gray-400 text-xs mb-4">取得日：{data.date}</p>
        <p className="text-gray-500 text-sm mb-1">1 {from} =</p>
        <p className="text-blue-600 font-bold text-4xl">{rate}</p>
        <p className="text-gray-400 text-lg mt-1">{to}</p>
      </div>
    </main>
  )
}