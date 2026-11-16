'use client';

import { Printer } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { track } from '@/lib/analytics';

/** Opens the browser's print dialog (the print stylesheet does the layout). */
export function PrintButton({ guide, label = 'Print this page' }: { guide: string; label?: string }) {
  return (
    <Button
      variant="outline"
      className="print:hidden"
      icon={<Icon icon={Printer} />}
      onClick={() => {
        track('guide_print', { guide });
        window.print();
      }}
    >
      {label}
    </Button>
  );
}
