import { notices } from '@/content/site';

/** "Calls are recorded" notice, shown wherever a visitor books or asks for a call. */
export function CallRecordingNotice({ className = '' }: { className?: string }) {
  return (
    <p role="note" className={`text-base ${className}`.trim()}>
      <strong>Calls are recorded.</strong> {notices.callRecording}
    </p>
  );
}
