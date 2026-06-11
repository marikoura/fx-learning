// Day3 練習問題 - 通貨ペアアプリのベース

interface CurrencyPair {
    symbol: string        // 例: "USD/JPY"
    bid: number           // 買値
    ask: number           // 売値
    spread: number        // スプレッド（ask - bid）
    isFavorite?: boolean  // お気に入り登録
  }

type PairSummary = Pick<CurrencyPair, "symbol" | "spread">;
  // ここから下に問題を書いていく

  // 問題1: pairListを作る
const pairList: CurrencyPair[] = [
    {
        symbol: "USD/JPY",
        bid: 100,
        ask: 101,
        spread: 1,
        isFavorite : true,
    },
    {
        symbol: "EUR/JPY",
        bid: 150,
        ask: 151,
        spread: 1,
        isFavorite : false,
    },
    {
        symbol: "GBP/JPY",
        bid: 150,
        ask: 151,
        spread: 1,
        isFavorite: true,
    }
]
  // 問題2: getFavoritesを書く
function getFavorites(pairs: CurrencyPair[]): CurrencyPair[] {
    return pairs.filter(pair=>pair.isFavorite === true);
}

  // 問題3: PairSummary型とtoSummaryListを書く
  function toSummaryList(pairs: CurrencyPair[]): PairSummary[] {
    return pairs.map((pair) => ({
        symbol: pair.symbol,
        spread: pair.ask - pair.bid,
    }))
  }

  // 動作確認
console.log("=== お気に入り ===")
console.log(getFavorites(pairList))

console.log("=== サマリー ===")
console.log(toSummaryList(pairList))