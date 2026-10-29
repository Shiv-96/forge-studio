/**
 * src/components/Plans.jsx
 * Membership tiers with a Monthly / Quarterly / Yearly switch.
 * The switch is a radiogroup (arrow keys move between options, as with native radios).
 * Prices are computed from monthly list prices in src/utils/pricing.js.
 */
import { useRef, useState } from 'react';
import { billingOptions, plans } from '../data/plans';
import { formatINR, getPlanPrice } from '../utils/pricing';
import Icon from './Icon';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function BillingSwitch({ value, onChange }) {
  const refs = useRef([]);
  const index = billingOptions.findIndex((o) => o.id === value);

  // Roving focus: arrow keys select the previous/next option, like native radio buttons.
  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (index + step + billingOptions.length) % billingOptions.length;
    onChange(billingOptions[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div role="radiogroup" aria-label="Billing period" className="inline-flex flex-wrap gap-2" onKeyDown={onKeyDown}>
      {billingOptions.map((opt, i) => (
        <button
          key={opt.id}
          ref={(el) => (refs.current[i] = el)}
          type="button"
          role="radio"
          aria-checked={value === opt.id}
          tabIndex={value === opt.id ? 0 : -1}
          onClick={() => onChange(opt.id)}
          className="chip"
        >
          {opt.label}
          {opt.discount > 0 && <span className="ml-1.5 text-xs opacity-80">−{Math.round(opt.discount * 100)}%</span>}
        </button>
      ))}
    </div>
  );
}

export default function Plans() {
  const [billingId, setBillingId] = useState('monthly');
  const billing = billingOptions.find((o) => o.id === billingId);

  return (
    <section id="plans" aria-labelledby="plans-title" className="border-t border-ink-800 bg-ink-900/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="plans-title"
          eyebrow="Membership"
          title={
            <>
              Simple plans. <span className="text-volt">No joining fee.</span>
            </>
          }
          intro="Every plan starts with a free trial class and a fitness assessment. Pause for up to 30 days a year."
        />

        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <BillingSwitch value={billingId} onChange={setBillingId} />
          <p className="text-sm text-ink-400" aria-live="polite">
            {billing.discount > 0
              ? `Save ${Math.round(billing.discount * 100)}% when you pay ${billing.label.toLowerCase()}.`
              : 'Pay month to month. Switch to quarterly or yearly to save.'}
          </p>
        </div>

        <ul className="grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const price = getPlanPrice(plan.monthlyPrice, billing);
            return (
              <Reveal
                as="li"
                key={plan.id}
                delay={i * 90}
                className={`card flex flex-col p-7 md:p-8 ${plan.popular ? 'border-volt lg:-mt-4 lg:pb-12' : ''}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="heading-display text-4xl text-ink-100">{plan.name}</h3>
                  {plan.popular && (
                    <span className="tag tag-volt font-semibold uppercase tracking-wider">Most popular</span>
                  )}
                </div>
                <p className="mt-2 text-ink-400">{plan.summary}</p>

                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl text-ink-100">{formatINR(price.perMonth)}</span>
                  <span className="text-ink-400">/ month</span>
                </p>
                <p className="mt-2 min-h-10 text-sm text-ink-400">
                  {billing.months === 1
                    ? 'Billed monthly. Cancel any time.'
                    : `${formatINR(price.total)} billed every ${billing.months} months. You save ${formatINR(price.savings)}.`}
                </p>

                <ul className="mt-6 space-y-3 border-t border-ink-700 pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-ink-100">
                      <Icon name="check" className="mt-0.5 size-5 shrink-0 text-volt" strokeWidth={2.25} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#trial"
                  className={`btn mt-8 w-full ${plan.popular ? 'btn-primary' : 'btn-ghost'}`}
                  aria-label={`${plan.cta}: book a free trial first`}
                >
                  {plan.cta}
                </a>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-ink-400">Prices include GST. Personal training sessions are 45 minutes.</p>
      </div>
    </section>
  );
}
