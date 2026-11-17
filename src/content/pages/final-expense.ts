import type { ContentPage } from './types.ts';

/** Services › Beyond Medicare › Final Expense (plan §4; separate appointment, life line). */
export const finalExpensePage: ContentPage = {
  path: '/beyond-medicare/final-expense',
  meta: {
    title: 'Final expense life insurance explained',
    description: 'Small whole life policies for funeral and final bills: how they work, simplified-issue vs guaranteed-issue, questions to ask, and why Medicare pays none of it.',
  },
  crumbs: [
    { label: 'Services', href: '/services' },
    { label: 'Beyond Medicare', href: '/beyond-medicare' },
    { label: 'Final Expense', href: '/beyond-medicare/final-expense' },
  ],
  intro: {
    eyebrow: 'Life insurance',
    title: 'Final expense: planning for final bills',
    lead: 'Medicare pays nothing toward funeral, burial or the bills a family faces after a death. A small whole life policy can leave money for them.',
  },
  disclosure: 'life',
  sections: [
    {
      id: 'how-it-works',
      eyebrow: 'The basics',
      title: 'How final expense insurance works',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'A small whole life policy', text: 'Face amounts are usually modest, often enough for a funeral and final bills.' },
            { title: 'Fixed premiums', text: 'The premium usually stays the same for life and the coverage does not expire.' },
            { title: 'Paid to your beneficiary', text: 'The money goes to the person you name, who can use it for any cost.' },
            { title: 'Builds cash value', text: 'Whole life policies build a small cash value over time.' },
          ],
        },
      ],
    },
    {
      id: 'issue-types',
      eyebrow: 'Health questions',
      title: 'Simplified-issue or guaranteed-issue',
      blocks: [
        {
          type: 'table',
          caption: 'Simplified-issue and guaranteed-issue final expense policies',
          head: ['', 'Simplified-issue', 'Guaranteed-issue'],
          rows: [
            ['Health questions', 'A short list, no medical exam', 'None'],
            ['Price', 'Lower', 'Higher for the same amount'],
            ['Waiting period', 'Usually full coverage from day one if approved', 'Often a 2-year graded period for non-accidental death'],
            ['Best for', 'Fairly good health', 'Health conditions that make other coverage hard to get'],
          ],
        },
      ],
    },
    {
      id: 'questions',
      eyebrow: 'Before you buy',
      title: 'Questions to ask',
      blocks: [
        {
          type: 'list',
          items: [
            'Is there a waiting period, and what does it pay during it?',
            'Does the premium ever go up, and does the coverage ever end?',
            'Who underwrites the policy, and what is its financial rating?',
            'Can I change my beneficiary later?',
            'What happens if I miss a payment?',
          ],
        },
        {
          type: 'callout',
          title: 'Licensed states',
          text: 'We offer final expense only in states where our agents hold a life insurance license. Licensing details list each state and line of authority.',
        },
      ],
    },
  ],
  pdf: 'final-expense-worksheet',
  next: {
    title: 'Book a separate final expense call',
    text: 'Medicare rules keep life insurance out of Medicare appointments, so final expense always has its own appointment, only when you ask for one.',
    primary: { label: 'Book a separate final expense call', href: '/book-a-call?finalExpense=1' },
    secondary: { label: 'Licensing details', href: '/legal/licensing' },
  },
};
