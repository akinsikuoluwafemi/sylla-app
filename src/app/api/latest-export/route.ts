import { db } from '@/db';
import { pdfExports } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET() {
  const [latest] = await db.select().from(pdfExports).orderBy(desc(pdfExports.createdAt)).limit(1);

  const response = NextResponse.json({ export: latest ?? null });
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
