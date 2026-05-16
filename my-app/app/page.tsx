"use client"

import { useEffect, useMemo, useState } from "react"
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
  const [isOrderOpen, setIsOrderOpen] = useState(false)
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])
  const [dbMenuItems, setDbMenuItems] = useState<MenuItem[]>([])
  const [dbError, setDbError] = useState("")

  useEffect(() => {
    const savedOrder = window.localStorage.getItem("osaki-order")
    const savedSplit = window.localStorage.getItem("osaki-split")

    if (savedOrder) {
      try {
        setOrderItems(JSON.parse(savedOrder))
      } catch {
        setOrderItems([])
      }
    }
    if (savedSplit) {
      const parsed = Number(savedSplit)
      setSplitCount(parsed > 0 ? parsed : 1)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("osaki-order", JSON.stringify(orderItems))
  }, [orderItems])

  useEffect(() => {
    window.localStorage.setItem("osaki-split", String(splitCount))
  }, [splitCount])

  useEffect(() => {
    const loadDbMenu = async () => {
      try {
        const res = await fetch("/api/menu", { cache: "no-store" })
        if (!res.ok) {
          throw new Error(`DB取得に失敗しました (${res.status})`)
        }
        const data: MenuItem[] = await res.json()
        setDbMenuItems(data)
      } catch (error) {
        console.error(error)
        setDbError("データベースからメニューを読み込めませんでした。環境変数と接続先を確認してください。")
      }
    }

    loadDbMenu()
  }, [])

  const activeCategory = menuCategories.find((category) => category.genre === activeGenre) ?? menuCategories[0]
  const allAllergens = useMemo(
    () =>
      Array.from(
        new Set(
          menuCategories.flatMap((category) => category.items.flatMap((item) => item.allergens ?? []))
        )
      ),
    []
  )
  const filteredCategoryItems = useMemo(
    () =>
      activeCategory.items.filter((item) =>
        selectedAllergens.every((allergen) => !(item.allergens ?? []).includes(allergen))
      ),
    [activeCategory.items, selectedAllergens]
  )
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

  const removeFromOrder = (itemId: string) => {
    const nextOrder = orderItems.filter((order) => order.item.id !== itemId)
    setOrderItems(nextOrder)
    if (nextOrder.length === 0) {
      setIsOrderOpen(false)
    }
  }

  const clearOrder = () => {
    setOrderItems([])
    setErrorMessage("")
    setIsOrderOpen(false)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_rgba(241,245,249,0.95),_transparent_90%)] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-5 pb-56">
        <header className="space-y-4">
          <div className="overflow-hidden rounded-[2.5rem] shadow-xl shadow-slate-900/20">
            <div
              className="relative h-72 bg-cover bg-center"
              style={{ backgroundImage: `url(${menuCategories[0].items[0]?.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-slate-950/80" />
              <div className="relative flex h-full flex-col justify-between px-5 py-4 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-300">MENU</p>
                  <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg text-white shadow-sm shadow-white/10">
                    <span className="leading-none">≡</span>
                  </button>
                </div>
                <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <div className="text-center">
                    <p className="text-3xl font-semibold tracking-tight">OSAKI</p>
                    <p className="mt-1 text-sm text-slate-200">和食カフェ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-3 px-2 pb-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-900">カテゴリーから選ぶ</p>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4 py-2 text-sm"
                onClick={() => setIsOrderOpen((open) => !open)}
              >
                注文リストを見る
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 px-2">
              {allAllergens.length > 0 ? (
                allAllergens.map((allergen) => {
                  const isSelected = selectedAllergens.includes(allergen)
                  return (
                    <button
                      key={allergen}
                      type="button"
                      onClick={() =>
                        setSelectedAllergens((current) =>
                          current.includes(allergen)
                            ? current.filter((value) => value !== allergen)
                            : [...current, allergen]
                        )
                      }
                      className={`rounded-full border px-3 py-2 text-sm transition ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-slate-200 bg-slate-100 text-slate-700 hover:border-emerald-500"
                      }`}
                    >
                      {allergen}
                    </button>
                  )
                })
              ) : (
                <p className="text-sm text-slate-500">アレルゲン情報はありません。</p>
              )}
            </div>
            {selectedAllergens.length > 0 ? (
              <div className="px-2 pt-2 text-sm text-slate-600">除外中: {selectedAllergens.join("、")}</div>
            ) : null}
            <div className="grid gap-3">
              {menuCategories.map((category) => (
                <button
                  key={category.genre}
                  type="button"
                  onClick={() => setActiveGenre(category.genre)}
                  className={`group relative overflow-hidden rounded-[1.75rem] border p-4 text-left transition shadow-sm ${
                    category.genre === activeGenre
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-emerald-200/80"
                      : "border-slate-200 bg-slate-50 text-slate-900 hover:border-emerald-500 hover:bg-emerald-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-500 group-hover:text-emerald-700 sm:text-xs">
                        {category.genre}
                      </p>
                      <p className="mt-2 text-lg font-semibold">{category.items.length} 品</p>
                    </div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-sm font-semibold text-white shadow-sm shadow-slate-900/10">
                      ≫
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </header>
        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-slate-900">DB サンプルメニュー</p>
              <p className="mt-1 text-sm text-slate-500">Neon PostgreSQL から読み込んだデータを表示しています。</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {dbMenuItems.length} 件
            </span>
          </div>
          {dbError ? (
            <div className="mt-4 rounded-[1.5rem] bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200">
              {dbError}
            </div>
          ) : null}
          <div className="mt-4 space-y-3">
            {dbMenuItems.length === 0 && !dbError ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                DB からのメニューを読み込み中です。
              </div>
            ) : null}
            {dbMenuItems.map((item) => (
              <div key={item.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{item.name}</p>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                  <p className="font-semibold text-slate-950">¥{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-slate-900">{activeCategory.genre} メニュー</p>
                <p className="mt-1 text-sm text-slate-500">{filteredCategoryItems.length} 件が対象となっています</p>
              </div>
            </div>
            <div key={activeCategory.genre} className="space-y-4 mt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-950">{activeCategory.genre}</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {activeCategory.items.length} 品
                </span>
              </div>
              <div className="space-y-3">
                {filteredCategoryItems.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    選択したアレルギー物質を含まないメニューはありません。
                  </div>
                ) : (
                  filteredCategoryItems.map((item) => (
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
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
        {isOrderOpen ? (
          <section className="fixed inset-x-0 bottom-20 z-30 mx-auto w-full max-w-md px-4 pb-4">
            <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-base font-semibold text-slate-900">注文リスト</p>
                  <p className="text-sm text-slate-600">合計 {itemCount} 個</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={clearOrder}
                    className="rounded-full bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    全キャンセル
                  </button>
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
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-semibold text-slate-950">{order.item.name}</p>
                            <p className="text-sm text-slate-600">{order.quantity} 個</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-sm font-semibold text-slate-950">¥{order.item.price * order.quantity}</p>
                            <button
                              type="button"
                              onClick={() => removeFromOrder(order.item.id)}
                              className="rounded-full bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                            >
                              キャンセル
                            </button>
                          </div>
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
        ) : null}

        <section className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md px-4 pb-4">
          <div className="rounded-[2rem] bg-white p-4 shadow-md ring-1 ring-slate-200">
            <button
              type="button"
              onClick={() => setIsOrderOpen((open) => !open)}
              className="flex w-full items-center justify-between gap-3 rounded-[1.5rem] bg-emerald-600 px-5 py-4 text-left text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-700"
            >
              <div>
                <p className="text-base font-semibold">注文リスト</p>
                <p className="text-sm text-white/80">{itemCount} 個 ・ ¥{totalPrice}</p>
              </div>
              <span className="text-sm font-semibold">{isOrderOpen ? "閉じる" : "開く"}</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
