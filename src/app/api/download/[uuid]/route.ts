import { db } from '@/db';
import { pdfExports } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(_: NextRequest, context: { params: { uuid: string } }) {
  const { uuid } = context.params;

  const [item] = await db.select().from(pdfExports).where(eq(pdfExports.uuid, uuid));

  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (!item.createdAt) {
    return NextResponse.json({ error: 'Missing timestamp' }, { status: 500 });
  }

  const expired = Date.now() - new Date(item.createdAt).getTime() > 120_000;

  if (expired) return NextResponse.json({ error: 'Expired' }, { status: 403 });

  return NextResponse.redirect(item.pdfUrl);
}