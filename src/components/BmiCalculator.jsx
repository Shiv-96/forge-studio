/**
 * src/components/BmiCalculator.jsx
 * BMI calculator: height (cm) + weight (kg) → BMI, WHO category and a gauge.
 * - Calculation and validation are plain functions in src/utils/bmi.js.
 * - Inputs have labels, range hints, inline errors (aria-invalid + aria-describedby).
 * - The result region uses aria-live so screen readers announce the new result.
 * - A disclaimer explains BMI is a screening tool, not a diagnosis.
 */
import { useState } from 'react';
import {
  BMI_CATEGORIES,
  BMI_LIMITS,
  GAUGE_RANGE,
  bmiToPercent,
  calculateBmi,
  getBmiCategory,
  validateBmiInputs,
} from '../utils/bmi';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

// Gauge bands: width of each WHO category inside the visible 15–40 range.
const bands = BMI_CATEGORIES.map((c) => {
  const start = bmiToPercent(Math.max(c.min, GAUGE_RANGE.min));
  const end = bmiToPercent(Math.min(c.max, GAUGE_RANGE.max));
  return { ...c, width: end - start };
});
const bandColor = {
  underweight: 'bg-ink-700',
  normal: 'bg-volt/70',
  overweight: 'bg-ink-500',
  obese: 'bg-ink-400/70',
};
// Short gauge labels so the narrow "Underweight" band still fits on a 360px phone.
const shortLabel = { underweight: 'Under', normal: 'Normal', overweight: 'Over', obese: 'Obese' };

function NumberField({ id, label, unit, value, onChange, error, limits }) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink-100">
        {label} <span className="font-normal text-ink-400">({unit})</span>
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          name={id}
          type="number"
          inputMode="decimal"
          step="0.1"
          min={limits.min}
          max={limits.max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={`${hintId}${error ? ` ${errorId}` : ''}`}
          className="field pr-14"
        />
        <span
          className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-ink-400"
          aria-hidden="true"
        >
          {unit}
        </span>
      </div>
      <p id={hintId} className="mt-1.5 text-xs text-ink-400">
        Between {limits.min} and {limits.max} {unit}
      </p>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export default function BmiCalculator() {
  const [values, setValues] = useState({ height: '', weight: '' });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const update = (key) => (val) => {
    setValues((v) => ({ ...v, [key]: val }));
    // Clear a field's error as soon as the visitor edits it.
    if (errors[key]) setErrors(({ [key]: _removed, ...rest }) => rest);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validateBmiInputs(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setResult(null);
      // Move focus to the first invalid field so keyboard users land on the problem.
      document.getElementById(found.height ? 'bmi-height' : 'bmi-weight')?.focus();
      return;
    }
    const bmi = calculateBmi(Number(values.height), Number(values.weight));
    setResult({ bmi, category: getBmiCategory(bmi) });
  };

  const onReset = () => {
    setValues({ height: '', weight: '' });
    setErrors({});
    setResult(null);
  };

  return (
    <section id="bmi" aria-labelledby="bmi-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            id="bmi-title"
            eyebrow="BMI calculator"
            title={
              <>
                Know your <span className="text-volt">starting point</span>
              </>
            }
            intro="A quick check using the WHO adult categories. Bring the number to your free assessment and we will look at the full picture."
          />
          <div className="border-l-2 border-volt bg-ink-900 p-5 text-sm leading-relaxed text-ink-400">
            <p className="font-semibold text-ink-100">BMI is a screening tool, not a diagnosis.</p>
            <p className="mt-1">
              It does not tell muscle from fat and does not account for age, sex or ethnicity. It is not meant for
              children, teens or pregnant women. For health advice, talk to a doctor.
            </p>
          </div>
        </div>

        <Reveal className="card p-6 sm:p-8">
          <form onSubmit={onSubmit} onReset={onReset} noValidate aria-describedby="bmi-form-note">
            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField
                id="bmi-height"
                label="Height"
                unit="cm"
                value={values.height}
                onChange={update('height')}
                error={errors.height}
                limits={BMI_LIMITS.height}
              />
              <NumberField
                id="bmi-weight"
                label="Weight"
                unit="kg"
                value={values.weight}
                onChange={update('weight')}
                error={errors.weight}
                limits={BMI_LIMITS.weight}
              />
            </div>
            <p id="bmi-form-note" className="sr-only">
              Results appear below the buttons.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="btn btn-primary">
                Calculate BMI
              </button>
              <button type="reset" className="btn btn-ghost">
                Reset
              </button>
            </div>
          </form>

          {/* Live region stays in the DOM so updates to its content are announced. */}
          <div aria-live="polite" aria-atomic="true" className="mt-8 border-t border-ink-700 pt-6">
            {result ? (
              <div>
                <p className="text-sm uppercase tracking-wider text-ink-400">Your BMI</p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-6xl leading-none text-ink-100">{result.bmi.toFixed(1)}</span>
                  <span className="text-xl font-semibold text-volt">{result.category.label}</span>
                </p>

                {/* Gauge. Decorative for screen readers: the text above carries the result. */}
                <div className="mt-8" aria-hidden="true">
                  <div className="relative">
                    <div className="flex h-3 overflow-hidden">
                      {bands.map((b) => (
                        <div key={b.id} className={bandColor[b.id]} style={{ width: `${b.width}%` }} />
                      ))}
                    </div>
                    <div
                      className="absolute -top-2 h-7 w-1 -translate-x-1/2 bg-ink-100 shadow-[0_0_0_3px_var(--color-ink-900)] transition-[left] duration-500"
                      style={{ left: `${bmiToPercent(result.bmi)}%` }}
                    />
                  </div>
                  <div className="mt-3 flex text-[11px] leading-tight text-ink-400">
                    {bands.map((b) => (
                      <span key={b.id} style={{ width: `${b.width}%` }} className="pr-1">
                        {shortLabel[b.id]}
                        <span className="block tabular-nums">
                          {b.min === 0 ? `< ${b.max}` : b.max === Infinity ? `${b.min}+` : `${b.min}–${b.max - 0.1}`}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-ink-400">
                Enter your height and weight to see your BMI and where it sits on the scale.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
