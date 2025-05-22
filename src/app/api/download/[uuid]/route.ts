import { db } from '@/db';
import { pdfExports } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { uuid: string } }) {
  const [item] = await db.select().from(pdfExports).where(eq(pdfExports.uuid, params.uuid));

  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (!item.createdAt) {
    return NextResponse.json({ error: 'Missing timestamp' }, { status: 500 });
  }

  const expired = Date.now() - new Date(item.createdAt).getTime() > 120_000;
  TODO: //remove this // const expired = Date.now() - new Date(item?.createdAt).getTime() > 5 * 60 * 1000;

  if (expired) return NextResponse.json({ error: 'Expired' }, { status: 403 });

  return NextResponse.redirect(item.pdfUrl);
}
