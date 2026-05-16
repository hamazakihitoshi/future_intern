"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { menuCategories, type MenuItem } from "@/lib/menu-data"

type OrderItem = {
  item: MenuItem
  quantity: number
}

const calculateTotal = (orderItems: OrderItem[]) =>
  orderItems.reduce((sum, order) => sum + order.item.price * order.quantity, 0)

const calculateSplit = (total: number, people: number) => {
  if (!people || people <= 0) {
    return 0
  }
  return Math.ceil(total / people)
}

export default function Home() {
  const [activeGenre, setActiveGenre] = useState(menuCategories[0].genre)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [splitCount, setSplitCount] = useState(1)
  const [errorMessage, setErrorMessage] = useState("")

  const activeCategory = menuCategories.find((category) => category.genre === activeGenre) ?? menuCategories[0]
  const totalPrice = useMemo(() => calculateTotal(orderItems), [orderItems])
  const itemCount = useMemo(() => orderItems.reduce((sum, order) => sum + order.quantity, 0), [orderItems])
  const perPersonPrice = useMemo(() => calculateSplit(totalPrice, splitCount), [totalPrice, splitCount])

  const addToOrder = (item: MenuItem) => {
    if (item.isSoldOut) {
      setErrorMessage(`申し訳ありません。「${item.name}」は品切れです。`)
      return
    }

    setErrorMessage("")
    setOrderItems((current) => {
      const existingIndex = current.findIndex((order) => order.item.id === item.id)
      if (existingIndex !== -1) {
        const next = [...current]
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        }
        return next
      }
      return [...current, { item, quantity: 1 }]
    })
  }

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
                            <div className="flex items-center gap-2">
                              <p className="text-base font-semibold text-slate-950">¥{item.price}</p>
                              <Button
                                className={`h-10 w-full rounded-2xl text-sm font-semibold transition sm:w-auto sm:px-4 ${
                                  item.isSoldOut
                                    ? "cursor-not-allowed bg-slate-300 text-slate-600 hover:bg-slate-300"
                                    : "bg-emerald-600 text-white shadow-sm shadow-emerald-900/20 hover:bg-emerald-700"
                                }`}
                                type="button"
                                onClick={() => addToOrder(item)}
                                disabled={item.isSoldOut}
                              >
                                {item.isSoldOut ? "品切れ" : "追加する"}
                              </Button>
                            </div>
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
        <section className="space-y-4">
          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-slate-900">注文リスト</p>
                <p className="text-sm text-slate-600">合計 {itemCount} 個</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600">人数</label>
                <input
                  type="number"
                  min={1}
                  value={splitCount}
                  onChange={(event) => setSplitCount(Number(event.target.value) || 1)}
                  className="w-20 rounded-2xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
            </div>

            {errorMessage ? (
              <div className="mt-4 rounded-2xl bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-200">
                {errorMessage}
              </div>
            ) : null}

            <div className="mt-5 space-y-3">
              {orderItems.length === 0 ? (
                <p className="text-sm leading-6 text-slate-600">追加されたメニューはまだありません。</p>
              ) : (
                <div className="space-y-3">
                  {orderItems.map((order) => (
                    <div key={order.item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-950">{order.item.name}</p>
                          <p className="text-sm text-slate-600">{order.quantity} 個</p>
                        </div>
                        <p className="text-sm font-semibold text-slate-950">¥{order.item.price * order.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 rounded-[1.5rem] bg-slate-50 p-4 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>合計金額</span>
                <span className="font-semibold text-slate-950">¥{totalPrice}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span>1人あたり</span>
                <span className="font-semibold text-slate-950">¥{perPersonPrice}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
