'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';
import { type Answers, type Match, match } from '@/lib/match/engine';
import { MatchResult } from './MatchResult';
import { Questionnaire } from './Questionnaire';

const today = () => new Date().toISOString().slice(0, 10);

/**
 * The free AI Plan Match: questionnaire, then the result. Each match is logged (inputs and
 * reasons, no name or full ZIP) so the recommendations can be reviewed (plan §6, No
 * steering); the static export has no server, so it only logs on the server build.
 */
export function PlanMatchTool() {
  const [result, setResult] = useState<Match | null>(null);
  const [run, setRun] = useState(0);

  const complete = (answers: Answers) => {
    const m = match(answers, today());
    setResult(m);
    track('tool_result', { tool: 'plan-match' });
    if (!process.env.NEXT_PUBLIC_STATIC_EXPORT) {
      void fetch('/api/plan-match', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // Only the ZIP and birth month leave the browser, and the server keeps just ZIP3 and the
        // birth year (AI Tool & Health Data Notice). The other answers stay here.
        body: JSON.stringify({ answers: { zip: answers.zip, birthMonth: answers.birthMonth }, result: { type: m.type, reasons: m.reasons } }),
        keepalive: true,
      }).catch(() => {});
    }
  };

  return result ? (
    <MatchResult
      match={result}
      onRestart={() => {
        setResult(null);
        setRun((r) => r + 1);
      }}
    />
  ) : (
    <Questionnaire key={run} onComplete={complete} />
  );
}
