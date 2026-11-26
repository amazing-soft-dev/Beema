/**
 * Notices for products that are not Medicare (plan §6, "Separate product disclosures").
 * Shown at the top and bottom of every Beyond Medicare page and on the Product Disclosures
 * page, and printed on the add-on PDFs. Never paraphrase them in components; carrier-
 * specific limited-benefit and duplication notices are added by the carrier with each quote.
 * Have them reviewed with the FMO before launch (#57).
 */
export type DisclosureKind = 'general' | 'life' | 'limited-benefit' | 'dental-vision';

export const disclosures: Record<DisclosureKind, { title: string; text: string }> = {
  general: {
    title: 'Not Medicare and not a government plan',
    text: 'The products on this page are not Medicare, not Medicare Supplement (Medigap) policies, and not connected with or endorsed by the U.S. government or the federal Medicare program. Each policy is underwritten by the insurance company that issues it. Benefits, costs and availability vary by state.',
  },
  life: {
    title: 'Final expense is life insurance, not Medicare',
    text: 'Final expense coverage is a whole life insurance policy. It is not Medicare, not a Medicare Supplement, and not connected with or endorsed by the U.S. government or the federal Medicare program. The policy is underwritten by the issuing life insurance company; benefits, waiting periods and availability vary by state. We discuss it only in a separate appointment that you ask for.',
  },
  'limited-benefit': {
    title: 'Hospital indemnity is a limited-benefit policy',
    text: 'Hospital indemnity insurance pays fixed cash amounts and is a limited-benefit policy. It is not Medicare, not a Medicare Supplement (Medigap) policy, and does not replace health coverage. It may duplicate benefits you already have; the carrier provides its own limited-benefit and duplication notices. Underwritten by the issuing insurance company; availability varies by state.',
  },
  'dental-vision': {
    title: 'Dental, vision and hearing plans are not Medicare',
    text: 'Stand-alone dental, vision and hearing plans are not Medicare and not Medicare Supplement (Medigap) policies, and are not connected with or endorsed by the U.S. government or the federal Medicare program. Plans are underwritten by the issuing company and may have waiting periods, annual maximums and networks. Availability varies by state.',
  },
};

/**
 * Medigap advertising notices (review 2026-11-25, California addendum). Every Medigap page or
 * ad shown in California must prominently say it is not connected with the government (Ins.
 * Code 10192.19(h)), and an ad that is not a full sales presentation must say, in uppercase
 * type, that an outline of coverage is available (10192.17(l)). Shown to every visitor.
 */
export const medigapAdNotice = {
  notConnected: 'Not connected with or endorsed by the U.S. Government or the federal Medicare program.',
  outlineOfCoverage:
    'AN OUTLINE OF COVERAGE FOR EACH MEDICARE SUPPLEMENT (MEDIGAP) POLICY IS AVAILABLE ON REQUEST. CALL US OR ASK YOUR AGENT, AND WE WILL SEND IT WITHIN 14 DAYS.',
} as const;

/**
 * Notice for hospital indemnity and other disability policies sold to people eligible for
 * Medicare (California Ins. Code 10192.17(k); review 2026-11-25, INS-22). The carrier prints it
 * on the outline of coverage; the page mirrors it, and the carrier's California forms apply.
 */
export const notMedigapNotice = {
  title: 'THIS POLICY IS NOT A MEDICARE SUPPLEMENT POLICY.',
  text: 'If you are eligible for Medicare, review the Guide to Health Insurance for People with Medicare, available from the insurance company. The application also tells you how much the policy duplicates Medicare benefits.',
} as const;
