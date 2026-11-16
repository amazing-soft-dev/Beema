'use client';

import { ChatCircleDots } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { notices } from '@/content/site';
import { track } from '@/lib/analytics';

declare global {
  interface Window {
    $crisp?: unknown[][];
    CRISP_WEBSITE_ID?: string;
  }
}

/**
 * "Chat with us" button. Crisp's script loads only after a click, so nothing third-party
 * runs or tracks before the visitor asks for chat. The first message shown is the required
 * CMS disclaimer. Hidden when NEXT_PUBLIC_CRISP_WEBSITE_ID is not set.
 */
export function ChatButton() {
  const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
  const pathname = usePathname() ?? '/';
  const [state, setState] = useState<'idle' | 'loading' | 'open'>('idle');
  if (!websiteId) return null;

  function openChat() {
    track('chat_open', { location: pathname });
    if (state !== 'idle') {
      window.$crisp?.push(['do', 'chat:open']);
      return;
    }
    setState('loading');
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = websiteId;
    window.$crisp.push(['config', 'color:theme', ['green']]);
    window.$crisp.push(['do', 'message:show', ['text', notices.cmsDisclaimer]]);
    window.$crisp.push(['do', 'chat:open']);
    window.$crisp.push(['on', 'session:loaded', () => setState('open')]);
    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    script.onerror = () => setState('idle');
    document.head.appendChild(script);
  }

  // Once Crisp is open it shows its own launcher, so ours steps aside.
  if (state === 'open') return null;
  return (
    <button
      type="button"
      onClick={openChat}
      className="fixed right-4 bottom-4 z-30 inline-flex min-h-14 items-center gap-2 rounded-pill bg-ink px-5 font-semibold text-white print:hidden md:right-6 md:bottom-6"
    >
      <Icon icon={ChatCircleDots} weight="fill" size={26} />
      {state === 'loading' ? 'Opening chat…' : 'Chat with us'}
    </button>
  );
}
