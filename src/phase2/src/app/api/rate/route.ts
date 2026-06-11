import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get("from")!
  const to = request.nextUrl.searchParams.get("to")!

  const response = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
  const data = await response.json()

  return NextResponse.json({ rate: data.rates[to] })
}