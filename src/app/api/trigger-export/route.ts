import { NextResponse } from 'next/server';
import { Client } from '@upstash/qstash';

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Check if the base URL is set and not localhost
  if (!baseUrl || baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
    return new Response('Running locally — skipping QStash', { status: 200 });
  }

  await qstash.publish({
    url: `${baseUrl}/api/process-export`,
  });

  return NextResponse.json({ success: true });
}
