import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FX通貨ペア情報",
  description: "FX通貨ペアの情報サイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-900 text-white min-h-screen`}>
        {/* ヘッダー */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <Link href="/" className="text-xl font-bold text-blue-600 tracking-wide">
            FX通貨ペア情報
          </Link>
        </header>
        {/* 各ページの中身がここに入る */}
        {children}
      </body>
    </html>
  );
}