export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  isNew?: boolean
  isSoldOut?: boolean
  allergens?: string[]
  tags?: string[]
}

export type MenuCategory = {
  genre: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    genre: "軽食",
    items: [
      {
        id: "cafe-01",
        name: "ベリーとクリームのワッフル",
        description: "ふわふわのワッフルにベリーとクリームをたっぷり添えて。",
        price: 780,
        imageUrl:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=640&q=80",
        isNew: true,
        tags: ["おすすめ", "人気"],
      },
      {
        id: "cafe-02",
        name: "アボカドとサーモンのオープンサンド",
        description: "ヘルシーなアボカドとサーモンのバランスが良い一皿。",
        price: 920,
        imageUrl:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-03",
        name: "きのこクリームのクロックムッシュ",
        description: "とろけるチーズとクリームソースが香るフレンチトースト。",
        price: 860,
        imageUrl:
          "https://images.unsplash.com/photo-1530541930197-ff4cea2f033e?auto=format&fit=crop&w=640&q=80",
        allergens: ["乳"],
      },
      {
        id: "cafe-04",
        name: "季節野菜のキッシュプレート",
        description: "彩り野菜を使ったやさしい味わいのキッシュ。",
        price: 940,
        imageUrl:
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
        imageUrl:
          "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=640&q=80",
        tags: ["サラダ"],
      },
      {
        id: "side-02",
        name: "ハーブチキンプレート",
        description: "香り豊かなハーブチキンを添えたヘルシーな一皿。",
        price: 980,
        imageUrl:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "side-03",
        name: "フライドポテト",
        description: "皮付きポテトのカリッとした食感が魅力です。",
        price: 420,
        imageUrl:
          "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=640&q=80",
        isSoldOut: false,
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
        imageUrl:
          "https://images.unsplash.com/photo-1514432324607-a09d9a0e7e86?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-06",
        name: "ほうじ茶ラテ",
        description: "香ばしいほうじ茶の風味とミルクの相性が良いドリンク。",
        price: 470,
        imageUrl:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-07",
        name: "フルーツティー",
        description: "さわやかなフルーツと紅茶の香りが楽しめます。",
        price: 520,
        imageUrl:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=640&q=80",
        tags: ["冷たい"],
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
        imageUrl:
          "https://images.unsplash.com/photo-1547516508-2b21dc6d6e73?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-09",
        name: "季節のパフェ",
        description: "旬のフルーツがのった贅沢なパフェ。",
        price: 720,
        imageUrl:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=640&q=80",
      },
      {
        id: "cafe-10",
        name: "キャラメルバナナトースト",
        description: "バナナとキャラメルのやさしい甘さが広がるトースト。",
        price: 620,
        imageUrl:
          "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=640&q=80",
      },
    ],
  },
]
