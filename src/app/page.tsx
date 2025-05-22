'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function Home() {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['exports'],
    queryFn: async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '');
      const res = await fetch(`${baseUrl}/api/latest-export`);
      return res.json();
    },
    refetchInterval: 2000,
    enabled: true,
  });

  useEffect(() => {
    if (data?.export) {
      const expiresIn = 2 * 60 * 1000; // 2 minutes expiration
      const expiresAt = new Date(data.export.createdAt).getTime() + expiresIn;
      const now = Date.now();
      if (now < expiresAt) {
        setDownloadUrl(`/api/download/${data.export.uuid}`);
      } else {
        setDownloadUrl(null);
      }
    } else {
      setDownloadUrl(null);
    }
  }, [data]);

  const handleExport = async () => {
    await fetch('/api/trigger-export', { method: 'POST' });
  };

  return (
    <main className='animate-gradient-xy flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-blue-300 p-24'>

      <h1 className='text-4xl font-bold text-white'>Welcome candidate</h1>
      <button onClick={handleExport} className='rounded bg-blue-600 p-2 text-white'>
        Trigger Export
      </button>
      {downloadUrl ? (
        <a href={downloadUrl} className='mt-4 block text-blue-500 underline' target='_blank'>
          Download PDF (expires in 2 mins)
        </a>
      ) : (
        <p className='mt-4 text-white'>No valid export link</p>
      )}
    </main>
  );
}
