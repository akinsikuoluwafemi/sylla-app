import { NextResponse } from 'next/server';
import { Client } from '@upstash/qstash';

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || '';

  if (!baseUrl || baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
    const response = new NextResponse('Running locally — skipping QStash', { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }

  await qstash.publish({
    url: `${baseUrl}/api/process-export`,
  });

  const response = NextResponse.json({ success: true });
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
