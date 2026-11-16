/** FAQ: short plain answers, each linking to the full explanation. */
export type Faq = { q: string; a: string; link?: { label: string; href: string } };
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: 'coverage',
    title: 'Coverage',
    items: [
      { q: 'What is the difference between Original Medicare and Medicare Advantage?', a: 'Original Medicare (Parts A and B) is run by the government and lets you see any provider that accepts Medicare. Medicare Advantage plans come from private companies, bundle your coverage and usually use a network of doctors.', link: { label: 'Compare them side by side', href: '/medicare-101#compare' } },
      { q: 'Do I need a Medigap policy?', a: 'Not always, but Original Medicare has no yearly limit on what you pay. A Medigap policy covers most of those costs, so many people on Original Medicare buy one.', link: { label: 'Medigap plans explained', href: '/medicare-101#medigap' } },
      { q: 'Does Medicare cover dental, vision and hearing?', a: 'Original Medicare does not cover most routine dental care, glasses or hearing aids. Many Medicare Advantage plans include some of this, or you can buy separate plans.', link: { label: 'Help with costs and gaps', href: '/medicare-101#dental-vision-hearing' } },
    ],
  },
  {
    id: 'enrollment',
    title: 'Enrollment',
    items: [
      { q: 'When can I sign up for Medicare?', a: 'During your 7-month Initial Enrollment Period: the 3 months before the month you turn 65, that month, and the 3 months after.', link: { label: 'Find my dates', href: '/tools/enrollment-calculator' } },
      { q: 'Will I be signed up automatically?', a: 'Yes, if you already get Social Security retirement benefits when you turn 65. Otherwise, you sign up yourself with Social Security.', link: { label: 'Turning 65 step by step', href: '/turning-65' } },
      { q: 'Can I change my plan later?', a: 'You can change Medicare Advantage and Part D plans every year from October 15 to December 7. Switching to a Medigap policy later may require health questions.', link: { label: 'Enrollment periods', href: '/medicare-101#enrollment-periods' } },
    ],
  },
  {
    id: 'costs',
    title: 'Costs',
    items: [
      { q: 'How much does Medicare cost?', a: 'Most people pay no premium for Part A. Part B has a standard monthly premium, plus any Medigap, Medicare Advantage or Part D premium you choose.', link: { label: 'The four parts and their costs', href: '/medicare-101#parts' } },
      { q: 'Why is my Part B premium higher than the standard amount?', a: 'If your income from two years ago was above a set limit, you pay an extra amount called IRMAA. You can ask for a new decision if your income has dropped.', link: { label: 'IRMAA calculator', href: '/tools/irmaa-calculator' } },
      { q: 'Do you charge for your help?', a: 'No. Insurance companies pay us when you enroll through us, and your premium is the same either way.', link: { label: 'How we work', href: '/about' } },
    ],
  },
  {
    id: 'working',
    title: 'Working past 65',
    items: [
      { q: 'I am still working. Do I need Part B?', a: 'If your employer has 20 or more employees and you have its health coverage, you can usually delay Part B without a penalty. With fewer than 20 employees, Medicare usually pays first, so sign up on time.', link: { label: 'Still working past 65', href: '/turning-65#working' } },
      { q: 'What happens when I retire?', a: 'You have 8 months after your job or job coverage ends to sign up for Part B, and 63 days to join a Part D plan without a penalty.', link: { label: 'Late penalties', href: '/turning-65#penalties' } },
      { q: 'Should I stop my Health Savings Account?', a: 'Yes, stop contributing at least 6 months before you sign up for Medicare, because Part A coverage can start up to 6 months earlier than you apply.' },
    ],
  },
  {
    id: 'special',
    title: 'Special situations',
    items: [
      { q: 'What if I have limited income?', a: 'Extra Help can lower drug costs, and Medicare Savings Programs can pay your Part B premium. You may qualify even with some savings.', link: { label: 'Help with costs', href: '/medicare-101#extra-help' } },
      { q: 'What if I move to another state?', a: 'Moving can give you a Special Enrollment Period to change Medicare Advantage or Part D plans. A Medigap policy usually moves with you, though the price may change.' },
      { q: 'Can someone help me who is not an agent?', a: 'Yes. Your State Health Insurance Assistance Program (SHIP) offers free, unbiased counseling, and Medicare answers questions at 1-800-MEDICARE.' },
    ],
  },
];
