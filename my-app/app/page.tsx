"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { menuCategories } from "@/lib/menu-data"

export default function Home() {
  const [activeGenre, setActiveGenre] = useState(menuCategories[0].genre)
  const activeCategory = menuCategories.find((category) => category.genre === activeGenre) ?? menuCategories[0]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_rgba(236,253,245,0.85),_transparent_80%)] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-5">
        <header className="space-y-4">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-8 shadow-lg shadow-emerald-500/20">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-white">OSAKI 亭</h1>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">店舗情報</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">東京都品川区大崎1-XYZ</p>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <span className="text-sm font-semibold text-slate-950">03-1234-5678</span>
                <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </header>
        <section className="space-y-4">
          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-semibold text-slate-900">メニュー一覧</p>
                <button className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  アレルギー物質で絞り込む＋
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {menuCategories.map((category) => (
                <button
                  key={category.genre}
                  type="button"
                  onClick={() => setActiveGenre(category.genre)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    category.genre === activeGenre
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-sm shadow-emerald-500/20"
                      : "border-slate-200 bg-slate-100 text-slate-700 hover:border-emerald-500 hover:text-emerald-800"
                  }`}
                >
                  {category.genre}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-6">
              <div key={activeCategory.genre} className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{activeCategory.genre}</p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {activeCategory.items.length} 品
                  </span>
                </div>
                <div className="space-y-3">
                  {activeCategory.items.map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white transition-shadow duration-200 hover:shadow-xl hover:shadow-slate-200/70"
                    >
                      <div className="grid grid-cols-[140px_1fr] gap-2 p-2 sm:grid-cols-[160px_1fr]">
                        <div className="aspect-[4/3] min-w-0 overflow-hidden rounded-[1.5rem] bg-slate-200">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <CardContent className="flex flex-1 flex-col justify-between gap-3 p-0">
                          <div className="space-y-1">
                            <p className="text-base font-semibold text-slate-950">{item.name}</p>
                            <p className="text-sm leading-5 text-slate-600">{item.description}</p>
                          </div>
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-base font-semibold text-slate-950">¥{item.price}</p>
                            <Button
                              className="h-10 w-full rounded-2xl bg-emerald-600 text-white shadow-sm shadow-emerald-900/20 transition hover:bg-emerald-700 sm:w-auto sm:px-4"
                              type="button"
                            >
                              追加する
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
