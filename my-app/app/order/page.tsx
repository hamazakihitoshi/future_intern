"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { type MenuItem } from "@/lib/menu-data"

type OrderItem = {
  item: MenuItem
  quantity: number
}

export default function OrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [splitCount, setSplitCount] = useState(1)

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

  const total = useMemo(
    () => orderItems.reduce((sum, orderItem) => sum + orderItem.item.price * orderItem.quantity, 0),
    [orderItems]
  )

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-3xl font-semibold text-slate-900">注文リスト</p>
            <p className="mt-1 text-sm text-slate-600">こちらで現在の注文を確認できます。</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">メニューに戻る</Link>
          </Button>
        </div>

        {orderItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
            現在、注文されている商品はありません。
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4">
                {orderItems.map((orderItem) => (
                  <div key={orderItem.item.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{orderItem.item.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{orderItem.item.description}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-sm text-slate-500">数量: {orderItem.quantity}</p>
                      <p className="text-lg font-semibold text-emerald-700">¥{orderItem.item.price * orderItem.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">合計</p>
                <p className="text-3xl font-semibold text-slate-900">¥{total}</p>
              </div>
              <div className="rounded-3xl bg-slate-100 p-4 text-right">
                <p className="text-sm text-slate-500">分割支払い</p>
                <p className="text-lg font-semibold text-emerald-700">{splitCount}人で ¥{Math.ceil(total / splitCount)} / 人</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
