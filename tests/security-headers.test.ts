import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { contentSecurityPolicy, securityHeaders } from '../src/lib/security-headers.ts';

describe('security headers', () => {
  const csp = contentSecurityPolicy();
  const directive = (name: string) => csp.split('; ').find((d) => d.startsWith(`${name} `)) ?? '';

  it('forbids framing the site (clickjacking) and plugins', () => {
    assert.equal(directive('frame-ancestors'), "frame-ancestors 'none'");
    assert.equal(directive('object-src'), "object-src 'none'");
    assert.equal(securityHeaders().find((h) => h.key === 'X-Frame-Options')!.value, 'DENY');
  });

  it('allows the services the site uses, and only those', () => {
    assert.match(directive('frame-src'), /https:\/\/app\.cal\.com/);
    assert.match(directive('script-src'), /https:\/\/client\.crisp\.chat/);
    assert.match(directive('script-src'), /https:\/\/va\.vercel-scripts\.com/);
    assert.match(directive('form-action'), /https:\/\/checkout\.stripe\.com/);
    assert.doesNotMatch(directive('script-src'), /\*/);
  });

  it('keeps eval out of production and adds it only for development', () => {
    assert.doesNotMatch(directive('script-src'), /unsafe-eval/);
    assert.match(contentSecurityPolicy(true), /unsafe-eval/);
  });

  it('sends the referrer, permissions and HSTS headers', () => {
    const keys = securityHeaders().map((h) => h.key);
    for (const k of ['Content-Security-Policy', 'Referrer-Policy', 'Permissions-Policy', 'X-Content-Type-Options', 'Strict-Transport-Security']) assert.ok(keys.includes(k), k);
  });
});
