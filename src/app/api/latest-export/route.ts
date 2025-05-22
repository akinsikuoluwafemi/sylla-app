import { db } from '@/db';
import { pdfExports } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const [latest] = await db.select().from(pdfExports).orderBy(desc(pdfExports.createdAt)).limit(1);

  return NextResponse.json({ export: latest ?? null });
}
