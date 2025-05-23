import { NextResponse } from 'next/server';
import { db } from '@/db';
import { pdfExports } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST() {
  await db.insert(pdfExports).values({
    uuid: uuidv4(),
    pdfUrl:
      'https://sylla-dev-public-bucket.s3.eu-central-1.amazonaws.com/books/47f4cad9aa3c005ce22fbdef05545308495bd571c55e02f7ae69353ac831d787',
    createdAt: new Date(),
  });

  const response = NextResponse.json({ success: true });
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
