'use client';

import dynamic from 'next/dynamic';

const LeadCaptureModal = dynamic(() => import('@/components/layout/LeadCaptureModal'), { ssr: false });
const StickyElementsWidget = dynamic(() => import('@/components/layout/StickyElementsWidget'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/layout/CookieConsent'), { ssr: false });

export function ClientWrappers() {
  return (
    <>
      <StickyElementsWidget />
      <CookieConsent />
      <LeadCaptureModal />
    </>
  );
}
