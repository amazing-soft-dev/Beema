'use client';

import { ChatCircleDots } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
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
 * "Chat with us" button. The first click shows who runs the chat, that messages are saved and
 * that replies may be automated (review 2026-11-25: California Penal Code 631, B&P 17941).
 * Crisp's script loads only after "Start chat", so nothing third-party runs or tracks before
 * the visitor agrees. The chat then opens with the notice and the required CMS disclaimer,
 * before any benefits are discussed. Hidden when NEXT_PUBLIC_CRISP_WEBSITE_ID is not set.
 */
export function ChatButton() {
  const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
  const pathname = usePathname() ?? '/';
  const [state, setState] = useState<'idle' | 'notice' | 'loading' | 'open'>('idle');
  if (!websiteId) return null;

  function openChat() {
    track('chat_open', { location: pathname });
    if (state === 'loading') {
      window.$crisp?.push(['do', 'chat:open']);
      return;
    }
    setState('loading');
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = websiteId;
    window.$crisp.push(['config', 'color:theme', ['green']]);
    window.$crisp.push(['do', 'message:show', ['text', notices.chatNotice]]);
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
  if (state === 'notice') {
    return (
      <div
        role="dialog"
        aria-labelledby="chat-notice-title"
        className="fixed right-4 bottom-4 z-30 flex max-w-[min(28rem,calc(100vw-2rem))] flex-col gap-4 rounded-card bg-white p-6 text-base shadow-lg ring-2 ring-line print:hidden md:right-6 md:bottom-6"
      >
        <h2 id="chat-notice-title" className="t-label font-semibold">
          Before you chat
        </h2>
        <p>{notices.chatNotice}</p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={openChat}>
            Start chat
          </Button>
          <Button size="lg" variant="outline" onClick={() => setState('idle')}>
            Not now
          </Button>
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => (state === 'idle' ? setState('notice') : openChat())}
      data-chat-button=""
      className="fixed right-4 bottom-4 z-30 inline-flex min-h-14 items-center gap-2 rounded-pill bg-ink px-5 font-semibold text-white print:hidden md:right-6 md:bottom-6"
    >
      <Icon icon={ChatCircleDots} weight="fill" size={26} />
      {state === 'loading' ? 'Opening chat…' : 'Chat with us'}
    </button>
  );
}
