import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { type MenuItem } from "@/lib/menu-data"

export async function GET() {
  type DbMenuRow = {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    is_sold_out: boolean
    allergens: string[]
  }

  const rows: DbMenuRow[] = await query<DbMenuRow>(
    `SELECT id, name, description, price, image_url, is_sold_out, allergens FROM menu_items ORDER BY id`
  )

  const items: MenuItem[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    imageUrl: row.image_url,
    isSoldOut: row.is_sold_out,
    allergens: row.allergens,
  }))

  return NextResponse.json(items)
}
