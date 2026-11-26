/** Checklist content for the ready-made PDF guides (rendered at /print/library/<slug>). */
export type ChecklistGroup = { title: string; items: string[] };

export const turning65Checklist: ChecklistGroup[] = [
  {
    title: '6 months before the month you turn 65',
    items: [
      'Find your Medicare dates with the enrollment calculator, or call us.',
      'Still working? Ask your employer how many employees it has and whether its drug coverage is creditable.',
      'Contributing to a Health Savings Account (HSA)? Ask your tax adviser when to stop (often 6 months before Medicare starts).',
      'Make a list of your medicines (name, strength, how often) and the doctors you want to keep.',
    ],
  },
  {
    title: '3 months before',
    items: [
      'If you do not get Social Security yet, sign up for Part A and Part B at ssa.gov/medicare or by phone.',
      'Decide your path: Original Medicare with Medigap and Part D, or Medicare Advantage.',
      'Compare plans for your medicines and doctors.',
    ],
  },
  {
    title: 'The month before your coverage starts',
    items: [
      'Watch for your red, white and blue Medicare card in the mail.',
      'Enroll in your Medicare Advantage or Part D plan so it starts with Part B.',
      'Apply for your Medigap policy during your 6-month Medigap Open Enrollment.',
    ],
  },
  {
    title: 'Your first year on Medicare',
    items: [
      'Keep your Medicare card and plan cards together, and give copies to your doctors and pharmacy.',
      'Book your free “Welcome to Medicare” preventive visit within 12 months of starting Part B.',
      'Read your plan’s Annual Notice of Change each September.',
      'Review your coverage during Annual Enrollment, October 15 to December 7.',
    ],
  },
];

export const annualEnrollmentChecklist: ChecklistGroup[] = [
  {
    title: 'In September and early October',
    items: [
      'Read your plan’s Annual Notice of Change: premiums, copays, drug list and network for next year.',
      'Update your list of medicines and doctors.',
      'Note any new health needs or planned procedures.',
    ],
  },
  {
    title: 'From October 15 to December 7',
    items: [
      'Check that your medicines are still on the plan’s drug list, at what tier.',
      'Check that your doctors and pharmacy are still in network.',
      'Compare next year’s total cost: premium, deductible and expected copays.',
      'If another plan fits better, enroll by December 7. Coverage starts January 1.',
      'Not happy with a Medicare Advantage plan after January 1? You can change once from January 1 to March 31.',
    ],
  },
];

export const partBSignup = {
  steps: [
    { title: 'Check whether you need to sign up', text: 'If you already get Social Security retirement benefits, you are enrolled in Parts A and B automatically. Otherwise, you sign up yourself.' },
    { title: 'Pick the right time', text: 'Sign up during the first 3 months of your Initial Enrollment Period so coverage starts the month you turn 65. If you have job coverage from an employer with 20 or more employees, you can usually wait.' },
    { title: 'Apply with Social Security', text: 'Apply online at ssa.gov/medicare, call 1-800-772-1213 (TTY 1-800-325-0778), or visit a local office.' },
    { title: 'Signing up after job coverage ends?', text: 'Use your 8-month Special Enrollment Period. Send form CMS-40B (Application for Enrollment in Part B) with form CMS-L564 (Request for Employment Information), completed by your employer, or other proof of job coverage.' },
    { title: 'Watch for your card and your first bill', text: 'Your Medicare card arrives by mail. If you do not get Social Security, Medicare bills you for the Part B premium.' },
  ],
} as const;

/** Gap worksheet (plan §5): who pays for each cost Medicare leaves out. One box per column. */
export const gapWorksheet = {
  columns: ['Covered by me (savings)', 'Covered by a plan I have', 'Not covered yet'],
  rows: ['Dental care', 'Eye exams and glasses', 'Hearing aids', 'Hospital out-of-pocket costs', 'Funeral and final costs', 'Long-term care at home or in a facility'],
};

/** Final expense planning worksheet (plan §5). A planning tool, not a quote. */
export const finalExpenseWorksheet: ChecklistGroup[] = [
  { title: 'Your wishes', items: ['I have written down my funeral or memorial wishes.', 'I have chosen burial or cremation.', 'I have told someone where these wishes are kept.'] },
  { title: 'Expected final bills', items: ['I know the rough cost of the funeral I want.', 'I have listed other bills (medical, credit cards, final utility bills).', 'I know which bills my estate pays and which my family might face.'] },
  { title: 'What I already have', items: ['I have listed existing life insurance policies and their amounts.', 'I have checked any pre-paid funeral plan or burial account.', 'I know how much savings is set aside for final costs.'] },
  { title: 'Beneficiaries', items: ['I have named a beneficiary on each policy and account.', 'My beneficiaries are up to date.', 'Someone I trust knows where the policies are kept.'] },
];

/** Dental and vision questions checklist (plan §5). */
export const dentalVisionChecklist: ChecklistGroup[] = [
  { title: 'Before you compare', items: ['I checked what my Medicare Advantage plan already includes, if I have one.', 'I listed my dentist and eye doctor.', 'I know what work I may need: cleanings, fillings, crowns, dentures, glasses.'] },
  { title: 'Questions to ask each plan', items: ['Is my dentist or eye doctor in the network?', 'How long is the waiting period for major work?', 'What is the annual maximum, and what do I pay after it?', 'How much is the allowance for glasses, contacts or hearing aids?', 'Can I keep the plan if I move?'] },
];

/** Caregiver's Medicare checklist (plan §5): introduces the Family tier without requiring it. */
export const caregiverChecklist: ChecklistGroup[] = [
  { title: 'Permission first', items: ['My parent signed Medicare’s authorization form (CMS-10106).', 'My parent signed each insurance company’s authorization form.', 'A health care power of attorney is in place, if my parent wants one.'] },
  { title: 'Documents to gather', items: ['Medicare card and every plan ID card', 'List of prescriptions, doses and pharmacies', 'Doctors and specialists with phone numbers', 'The Annual Notice of Change each September'] },
  { title: 'Key dates each year', items: ['By September 30: read the Annual Notice of Change.', 'October 15 to December 7: review and change plans if needed.', 'January 1 to March 31: one Medicare Advantage change, if needed.'] },
  { title: 'Getting help', items: ['Book the free yearly plan review with a licensed agent, together with your parent.', 'Optional: our planned Family tier adds a caregiver dashboard and reminders. It is never needed to get help.'] },
];
