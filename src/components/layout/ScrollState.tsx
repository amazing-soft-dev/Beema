'use client';

import { useEffect } from 'react';

/**
 * Sets data-scrolled on the header once the page leaves the top, so CSS can add the
 * divider and tighten the bar (Beema's "solid on scroll", without the transparency,
 * which hurts legibility over photos).
 */
export function ScrollState({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const update = () => el.toggleAttribute('data-scrolled', window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [targetId]);
  return null;
}
