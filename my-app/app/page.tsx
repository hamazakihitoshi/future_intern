"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
            まずは注文画面の全体レイアウトを決めて、スマホで押しやすい導線を確認します。
          </p>
        </header>

        <section className="space-y-4">
          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">メニュー表示エリア</p>
                <p className="mt-1 text-sm text-slate-500">この部分には後で料理カードが並びます。</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                仮表示
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <Card className="rounded-[1.5rem] border border-slate-200 bg-slate-50">
                <CardContent className="space-y-1">
                  <p className="text-sm font-semibold text-slate-950">メニューカード 1</p>
                  <p className="text-sm text-slate-600">料理名と価格が入る予定です。</p>
                </CardContent>
              </Card>
              <Card className="rounded-[1.5rem] border border-slate-200 bg-slate-50">
                <CardContent className="space-y-1">
                  <p className="text-sm font-semibold text-slate-950">メニューカード 2</p>
                  <p className="text-sm text-slate-600">縦に並べやすい構成にしています。</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-950">注文操作</p>
            <p className="mt-2 text-sm text-slate-600">
              ここから次の画面に進んだり、追加注文に移動できます。
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Button className="h-12 w-full rounded-2xl text-base font-semibold" type="button">
                注文リストを見る
              </Button>
              <Button variant="outline" className="h-12 w-full rounded-2xl text-base font-semibold" type="button">
                注文を追加する
              </Button>
            </div>
          </div>
        </section>

        <footer className="rounded-[2rem] bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
          <p>スマホ幅 375px 前後で見やすさと押しやすさを確認してください。</p>
        </footer>
      </main>
    </div>
  )
}
