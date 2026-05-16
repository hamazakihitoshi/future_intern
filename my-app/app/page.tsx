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
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-02",
        name: "アボカドとサーモンのオープンサンド",
        description: "ヘルシーなアボカドとサーモンのバランスが良い一皿。",
        price: 920,
        image:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-03",
        name: "きのこクリームのクロックムッシュ",
        description: "とろけるチーズとクリームソースが香るフレンチトースト。",
        price: 860,
        image:
          "https://images.unsplash.com/photo-1530541930197-ff4cea2f033e?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-04",
        name: "季節野菜のキッシュプレート",
        description: "彩り野菜を使ったやさしい味わいのキッシュ。",
        price: 940,
        image:
          "https://images.unsplash.com/photo-1529692236671-f1b1c0b3b542?auto=format&fit=crop&w=640&q=80",
      },
    ],
  },
  {
    genre: "サイド",
    items: [
      {
        id: "side-01",
        name: "シーザーサラダ",
        description: "シャキシャキ野菜とクリーミーなドレッシング。",
        price: 520,
        image:
          "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "side-02",
        name: "ハーブチキンプレート",
        description: "香り豊かなハーブチキンを添えたヘルシーな一皿。",
        price: 980,
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "side-03",
        name: "フライドポテト",
        description: "皮付きポテトのカリッとした食感が魅力です。",
        price: 420,
        image:
          "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=640&q=80",
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
          "https://images.unsplash.com/photo-1514432324607-a09d9a0e7e86?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-06",
        name: "ほうじ茶ラテ",
        description: "香ばしいほうじ茶の風味とミルクの相性が良いドリンク。",
        price: 470,
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-07",
        name: "フルーツティー",
        description: "さわやかなフルーツと紅茶の香りが楽しめます。",
        price: 520,
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=640&q=80",
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
          "https://images.unsplash.com/photo-1547516508-2b21dc6d6e73?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-09",
        name: "季節のパフェ",
        description: "旬のフルーツがのった贅沢なパフェ。",
        price: 720,
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-10",
        name: "キャラメルバナナトースト",
        description: "バナナとキャラメルのやさしい甘さが広がるトースト。",
        price: 620,
        image:
          "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=640&q=80",
      },
    ],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-5">
        <header className="rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_55%)] p-5 shadow-lg shadow-slate-200/40">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                店舗注文
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                OSAKI 亭
              </h1>
            </div>
            <div className="rounded-3xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-emerald-900/20">
              グリーンメニュー
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            こだわりのメニューからお好きな一品を追加してください。スマホでも押しやすいデザインです。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
              今日のおすすめ
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 ring-1 ring-slate-200">
              早割ドリンク
            </span>
          </div>
        </header>

        <section className="space-y-4">
          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
                  メニュー一覧
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-6">
              {menuCategories.map((category) => (
                <div key={category.genre} className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-950">{category.genre}</p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {category.items.length} 品
                    </span>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white transition-shadow duration-200 hover:shadow-xl hover:shadow-slate-200/70"
                      >
                        <div className="grid grid-cols-[120px_1fr] gap-4 p-4 sm:grid-cols-[150px_1fr]">
                          <div className="aspect-[4/3] min-w-0 overflow-hidden rounded-[1.5rem] bg-slate-200">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <CardContent className="flex flex-1 flex-col justify-between gap-4 p-0">
                            <div className="space-y-2">
                              <p className="text-base font-semibold text-slate-950">{item.name}</p>
                              <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <p className="text-base font-semibold text-slate-950">¥{item.price}</p>
                              <Button
                                className="h-11 w-full rounded-2xl bg-emerald-600 text-white shadow-sm shadow-emerald-900/20 transition hover:bg-emerald-700 sm:w-auto sm:px-5"
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
              ))}
            </div>
          </div>
        </section>

        <footer className="rounded-[2rem] bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
          <p>スマホ幅で読みやすさと押しやすさを意識したレイアウトです。</p>
        </footer>
      </main>
    </div>
  )
}
