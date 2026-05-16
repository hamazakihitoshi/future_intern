"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const menuCategories = [
  {
    genre: "主菜",
    items: [
      {
        id: "main-01",
        name: "照り焼きチキン定食",
        description: "香ばしい照り焼きと白ごはんの定番セット。",
        price: 850,
        image:
          "https://images.unsplash.com/photo-1543353071-087092ec393b?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "main-02",
        name: "和風ハンバーグ",
        description: "大根おろしソースがのった食べ応えのある一品。",
        price: 920,
        image:
          "https://images.unsplash.com/photo-1604908177529-5b7126415d3b?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "main-03",
        name: "海老フライプレート",
        description: "サクサクの海老フライとタルタルソース。",
        price: 980,
        image:
          "https://images.unsplash.com/photo-1604908813544-47e5bfd94b63?auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
  {
    genre: "飲み物",
    items: [
      {
        id: "drink-01",
        name: "抹茶ラテ",
        description: "ほんのり甘く、ほっとする味わい。",
        price: 420,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "drink-02",
        name: "アイスコーヒー",
        description: "すっきり冷たい、のどごしの良い一杯。",
        price: 380,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
  {
    genre: "デザート",
    items: [
      {
        id: "dessert-01",
        name: "抹茶プリン",
        description: "なめらかな食感とほろ苦さが楽しめるデザート。",
        price: 520,
        image:
          "https://images.unsplash.com/photo-1516222338252-7be1e7bed350?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "dessert-02",
        name: "黒蜜きなこ餅",
        description: "和風の甘さを楽しめるやさしい一品。",
        price: 480,
        image:
          "https://images.unsplash.com/photo-1505253213608-14b6ffd1f61c?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "dessert-03",
        name: "季節のフルーツ盛り合わせ",
        description: "彩りもきれいなさっぱりデザート。",
        price: 600,
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=500&q=60",
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
                <p className="mt-1 text-sm text-slate-500">ジャンル別に見やすく整理したカード表示です。</p>
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
