import { Pool, type QueryResultRow } from "pg"

let pool: Pool | null = null

function getPool() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL が設定されていません。.env.local または Vercel の環境変数を確認してください。")
  }

  if (!pool) {
    pool = new Pool({ connectionString })
  }

  return pool
}

export async function query<T extends QueryResultRow>(text: string, params?: unknown[]) {
  const client = await getPool().connect()
  try {
    const result = await client.query<T>(text, params)
    return result.rows as T[]
  } finally {
    client.release()
  }
}
