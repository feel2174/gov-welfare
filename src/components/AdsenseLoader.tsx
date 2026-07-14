'use client';

import { usePathname } from 'next/navigation';

const AD_ELIGIBLE_EXACT = ['/', '/checklist', '/glossary', '/about', '/editorial-policy'];
const AD_ELIGIBLE_PREFIXES = ['/notes'];

function isAdEligible(pathname: string): boolean {
  if (AD_ELIGIBLE_EXACT.includes(pathname)) return true;
  return AD_ELIGIBLE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export default function AdsenseLoader() {
  const pathname = usePathname();

  if (!isAdEligible(pathname)) {
    return null;
  }

  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8738602180421069"
      crossOrigin="anonymous"
    />
  );
}
