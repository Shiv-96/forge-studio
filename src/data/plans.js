/**
 * src/data/plans.js
 * Membership tiers and billing options. Prices are monthly list prices in INR.
 * Discounted prices for longer billing periods are computed in src/utils/pricing.js,
 * so changing `monthlyPrice` or a `discount` updates every card automatically.
 */

export const billingOptions = [
  { id: 'monthly', label: 'Monthly', months: 1, discount: 0 },
  { id: 'quarterly', label: 'Quarterly', months: 3, discount: 0.1 },
  { id: 'yearly', label: 'Yearly', months: 12, discount: 0.2 },
];

export const plans = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 1499,
    summary: 'For getting into the habit.',
    features: ['Open gym access, all hours', '2 group classes per week', 'Free fitness assessment', 'Locker access'],
    cta: 'Start with Basic',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 2499,
    popular: true,
    summary: 'For training most days of the week.',
    features: [
      'Open gym access, all hours',
      'Unlimited group classes',
      '1 personal training session a month',
      'Monthly progress check-in',
      'Locker and towel service',
    ],
    cta: 'Start with Pro',
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPrice: 3999,
    summary: 'For a plan built around you.',
    features: [
      'Everything in Pro',
      '4 personal training sessions a month',
      'Personalised training plan',
      'Priority class booking',
      'Nutrition basics session (non-medical)',
    ],
    cta: 'Start with Elite',
  },
];
