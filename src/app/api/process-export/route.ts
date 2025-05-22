import { NextResponse } from 'next/server';
import { db } from '@/db';
import { pdfExports } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
  await db.insert(pdfExports).values({
    uuid: uuidv4(),
    pdfUrl:
      'https://sylla-dev-public-bucket.s3.eu-central-1.amazonaws.com/books/47f4cad9aa3c005ce22fbdef05545308495bd571c55e02f7ae69353ac831d787',
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
