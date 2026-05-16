-- Neon PostgreSQL 用サンプルテーブル定義
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  is_sold_out BOOLEAN NOT NULL DEFAULT FALSE,
  allergens TEXT[] NOT NULL DEFAULT '{}'
);

-- サンプルデータの投入
INSERT INTO menu_items (id, name, description, price, image_url, is_sold_out, allergens) VALUES
  ('db-01', 'グリーンサラダ', '新鮮なリーフとドレッシングで仕上げたサラダ。', 500, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=640&q=80', false, '{乳}'),
  ('db-02', 'チキンバスケット', 'ジューシーなハーブチキンとサイドが楽しめるプレート。', 980, 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=640&q=80', false, '{}'),
  ('db-03', 'ベリーのワッフル', '甘酸っぱいベリーとクリームがのったワッフル。', 780, 'https://images.unsplash.com/photo-1530541930197-ff4cea2f033e?auto=format&fit=crop&w=640&q=80', false, '{乳,小麦}');
