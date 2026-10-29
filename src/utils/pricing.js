/**
 * src/utils/pricing.js
 * Membership price calculations and Indian Rupee formatting.
 */

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/**
 * Format a number as Indian Rupees with Indian digit grouping.
 * @param {number} amount
 * @returns {string} e.g. formatINR(23990) → "₹23,990"
 */
export function formatINR(amount) {
  return inrFormatter.format(amount);
}

/**
 * Work out what a plan costs for a billing option.
 * Prices are rounded to the nearest rupee.
 *
 * @param {number} monthlyPrice - list price per month
 * @param {{ months: number, discount: number }} billing - e.g. { months: 3, discount: 0.1 }
 * @returns {{ perMonth: number, total: number, savings: number }}
 *
 * @example
 * getPlanPrice(2499, { months: 12, discount: 0.2 })
 * // → { perMonth: 1999, total: 23990, savings: 5998 }
 */
export function getPlanPrice(monthlyPrice, { months, discount }) {
  const fullPrice = monthlyPrice * months;
  const total = Math.round(fullPrice * (1 - discount));
  return {
    perMonth: Math.round(total / months),
    total,
    savings: fullPrice - total,
  };
}
