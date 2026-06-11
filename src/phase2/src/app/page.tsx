import FavoriteList from "./components/FavoriteList"
import Link from "next/link"

const pairs = ["USD-JPY", "EUR-JPY", "GBP-JPY"]

async function getRate(from: string, to: string): Promise<number> {
  const response = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
  const data = await response.json()
  return data.rates[to]
}

export default async function Page() {
  const pairList = await Promise.all(
    pairs.map(async (pair) => {
      const [from, to] = pair.split("-")
      return {
        symbol: pair,
        rate: await getRate(from, to),
      }
    })
  )

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">FX通貨ペア一覧</h1>
        <Link href="/favorites" className="flex items-center gap-1 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150">
          ★ お気に入り
        </Link>
      </div>
      <FavoriteList pairList={pairList} />
    </main>
  )
}

