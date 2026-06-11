"use client"

import { useFavorites } from "@/hooks/useFavorites"
import PairCard from "./PairCard"

interface Props {
    pairList: {symbol: string, rate: number}[];
}

export default function FavoriteList({ pairList}: Props) {
    const {favorites, toggleFavorite, initialized} = useFavorites()

    if (!initialized) return null

    return (
        <div className="flex gap-4">
            {pairList.map((pair) => (
                <PairCard key= {pair.symbol} symbol={pair.symbol} rate={pair.rate} isFavorite={favorites.includes(pair.symbol)} onToggle={toggleFavorite}/>
            ))}
        </div>
    )
}