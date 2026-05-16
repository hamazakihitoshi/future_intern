"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const menuCategories = [
  {
    genre: "軽食",
    items: [
      {
        id: "cafe-01",
        name: "ベリーとクリームのワッフル",
        description: "ふわふわのワッフルにベリーとクリームをたっぷり添えて。",
        price: 780,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "cafe-02",
        name: "アボカドとサーモンのオープンサンド",
        description: "ヘルシーなアボカドとサーモンのバランスが良い一皿。",
        price: 920,
        image:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "cafe-03",
        name: "きのこクリームのクロックムッシュ",
        description: "とろけるチーズとクリームソースが香るフレンチトースト。",
        price: 860,
        image:
          "https://images.unsplash.com/photo-1530541930197-ff4cea2f033e?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "cafe-04",
        name: "季節野菜のキッシュプレート",
        description: "彩り野菜を使ったやさしい味わいのキッシュ。",
        price: 940,
        image:
          "https://images.unsplash.com/photo-1529692236671-f1b1c0b3b542?auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
  {
    genre: "飲み物",
    items: [
      {
        id: "cafe-05",
        name: "カフェラテ",
        description: "ミルクのやさしさが広がる定番の一杯。",
        price: 450,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9a0e7e86?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "cafe-06",
        name: "ほうじ茶ラテ",
        description: "香ばしいほうじ茶の風味とミルクの相性が良いドリンク。",
        price: 470,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "cafe-07",
        name: "フルーツティー",
        description: "さわやかなフルーツと紅茶の香りが楽しめます。",
        price: 520,
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
  {
    genre: "デザート",
    items: [
      {
        id: "cafe-08",
        name: "チーズケーキプレート",
        description: "しっとり濃厚なチーズケーキにベリーソースを添えて。",
        price: 680,
        image:
          "https://images.unsplash.com/photo-1547516508-2b21dc6d6e73?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "cafe-09",
        name: "季節のパフェ",
        description: "旬のフルーツがのった贅沢なパフェ。",
        price: 720,
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "cafe-10",
        name: "キャラメルバナナトースト",
        description: "バナナとキャラメルのやさしい甘さが広がるトースト。",
        price: 620,
        image:
          "https://images.unsplash.com/photo-1505253213608-14b6ffd1f61c?auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-5">
        <header className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                店舗注文
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                OSAKI 亭
              </h1>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            メニュー一覧から料理を選び、
            <span className="font-medium text-slate-900">注文リストへ追加</span>してください。
          </p>
        </header>

        <section className="space-y-4">
          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">メニュー一覧</p>
              </div>
            </div>

            <div className="mt-5 space-y-6">
              {menuCategories.map((category) => (
                <div key={category.genre} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-950">{category.genre}</p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {category.items.length} 品
                    </span>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <Card key={item.id} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
                        <div className="flex gap-3 p-4 sm:gap-4">
                          <div className="flex h-24 w-24 flex-none overflow-hidden rounded-2xl bg-slate-200">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <CardContent className="flex flex-1 flex-col justify-between gap-3 p-0">
                            <div>
                              <p className="text-base font-semibold text-slate-950">{item.name}</p>
                              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <p className="text-base font-semibold text-slate-950">¥{item.price}</p>
                              <Button variant="outline" className="h-11 w-full rounded-2xl border-slate-300 text-sm font-semibold sm:w-auto sm:px-5" type="button">
                                注文リストへ追加
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="rounded-[2rem] bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
          <p>価格が見やすく、追加ボタンが各料理にある構成です。</p>
        </footer>
      </main>
    </div>
  )
}
