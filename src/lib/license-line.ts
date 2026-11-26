import { site } from '../content/site.ts';

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/**
 * Sign-off for every email: the agency name, then the word "Insurance" and the California CDI
 * license number on the line below, as Ins. Code 1725.5 requires in emails about licensed
 * activity (review 2026-11-25, INS-24), plus the NPN.
 */
const caLicense = site.licensedStates.find((s) => s.code === 'CA')?.license ?? '';
export const licenseLine = `${site.legalName}\nInsurance · California license ${caLicense} · NPN ${site.npn}`;
export const licenseLineHtml = escape(licenseLine).replace('\n', '<br>');
