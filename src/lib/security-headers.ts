/**
 * Security headers for every response of the server build (next.config.ts headers()).
 * The Content Security Policy allows only what the site loads: Cal.com (booking, after a
 * click), Crisp (chat, after a click), Vercel Web Analytics and Speed Insights, and the
 * redirect to Stripe Checkout. Next.js inlines small scripts (theme, hydration), so scripts
 * keep 'unsafe-inline'; development also needs 'unsafe-eval' for fast refresh.
 */
export function contentSecurityPolicy(dev = false): string {
  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", ...(dev ? ["'unsafe-eval'"] : []), 'https://client.crisp.chat', 'https://app.cal.com', 'https://va.vercel-scripts.com'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://client.crisp.chat'],
    'img-src': ["'self'", 'data:', 'blob:', 'https:'],
    'font-src': ["'self'", 'data:', 'https://client.crisp.chat'],
    'connect-src': ["'self'", 'https://client.crisp.chat', 'wss://client.relay.crisp.chat', 'https://*.crisp.chat', 'https://app.cal.com', 'https://api.cal.com', 'https://vitals.vercel-insights.com', 'https://va.vercel-scripts.com'],
    'frame-src': ['https://app.cal.com', 'https://cal.com', 'https://game.crisp.chat'],
    'media-src': ["'self'", 'https://client.crisp.chat'],
    'form-action': ["'self'", 'https://checkout.stripe.com', 'https://billing.stripe.com'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"],
  };
  const policy = Object.entries(directives).map(([k, v]) => `${k} ${v.join(' ')}`);
  if (!dev) policy.push('upgrade-insecure-requests');
  return policy.join('; ');
}

export function securityHeaders(dev = false): { key: string; value: string }[] {
  return [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy(dev) },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  ];
}
