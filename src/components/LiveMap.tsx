"use client";

import dynamic from 'next/dynamic';

const LiveMapInner = dynamic(() => import('./LiveMapInner'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl flex items-center justify-center">
      <p className="text-gray-500">Loading Map...</p>
    </div>
  ),
});

export default function LiveMap() {
  return <LiveMapInner />;
}
