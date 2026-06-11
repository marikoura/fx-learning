"use client"

import { useState, useEffect } from "react";

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([])
    const [initialized, setInitialized] = useState<boolean>(false)

    useEffect(() => {
        const raw = localStorage.getItem("fx-favorites")
        if (raw) setFavorites(JSON.parse(raw))
        setInitialized(true)
    },[])

    const toggleFavorite = (symbol: string) => {
        setFavorites(prev =>{
            const next = prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
            localStorage.setItem("fx-favorites", JSON.stringify(next))
            return next
        })
    }

    const isFavorite = (symbol: string) => favorites.includes(symbol)

    return { favorites, toggleFavorite, isFavorite, initialized }
}