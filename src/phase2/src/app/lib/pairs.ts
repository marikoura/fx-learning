export interface CurrencyPair {
    symbol: string
    bid: number
    ask: number
    spread: number
}

export const pairList: CurrencyPair[] = [
    { symbol: "USD-JPY", bid: 100, ask: 101, spread: 1 },
    { symbol: "EUR-JPY", bid: 150, ask: 151, spread: 1 },
    { symbol: "GBP-JPY", bid: 150, ask: 151, spread: 1 },
]