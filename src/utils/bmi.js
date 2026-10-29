/**
 * src/utils/bmi.js
 * Body Mass Index helpers: input validation, calculation, WHO adult categories
 * and gauge positioning. Plain functions, independent of React.
 *
 * BMI is a population-level screening measure. It does not account for muscle
 * mass, age, sex or ethnicity, so the UI always shows a disclaimer next to it.
 */

/** Accepted input ranges (units are fixed: centimetres and kilograms). */
export const BMI_LIMITS = {
  height: { min: 100, max: 250 },
  weight: { min: 25, max: 300 },
};

/** WHO adult categories. `max` is exclusive; the last band has no upper limit. */
export const BMI_CATEGORIES = [
  { id: 'underweight', label: 'Underweight', min: 0, max: 18.5 },
  { id: 'normal', label: 'Normal weight', min: 18.5, max: 25 },
  { id: 'overweight', label: 'Overweight', min: 25, max: 30 },
  { id: 'obese', label: 'Obese', min: 30, max: Infinity },
];

/** Visible range of the gauge. Values outside are pinned to the ends. */
export const GAUGE_RANGE = { min: 15, max: 40 };

/**
 * Validate raw input values from the form.
 * @param {{ height: string|number, weight: string|number }} values
 * @returns {{ height?: string, weight?: string }} an error message per invalid field (empty object = valid)
 */
export function validateBmiInputs({ height, weight }) {
  const errors = {};
  const check = (key, raw, unit) => {
    const { min, max } = BMI_LIMITS[key];
    const value = Number(raw);
    if (raw === '' || raw === null || raw === undefined) {
      errors[key] = `Enter your ${key} in ${unit}.`;
    } else if (!Number.isFinite(value) || value < min || value > max) {
      errors[key] = `Enter a ${key} between ${min} and ${max} ${unit}.`;
    }
  };
  check('height', height, 'cm');
  check('weight', weight, 'kg');
  return errors;
}

/**
 * Calculate BMI = weight (kg) / height (m)², rounded to 1 decimal place.
 * @param {number} heightCm
 * @param {number} weightKg
 * @returns {number} e.g. 22.9
 */
export function calculateBmi(heightCm, weightKg) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  // Number.EPSILON avoids floating-point cases like 24.95 rounding down to 24.9.
  return Math.round((bmi + Number.EPSILON) * 10) / 10;
}

/**
 * Find the WHO category for a BMI value.
 * Pass the rounded value so the category always matches the number shown on screen.
 * @param {number} bmi
 * @returns {{ id: string, label: string, min: number, max: number }}
 */
export function getBmiCategory(bmi) {
  return BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) ?? BMI_CATEGORIES.at(-1);
}

/**
 * Convert a BMI value to a 0–100 position on the gauge.
 * @param {number} bmi
 * @param {{ min: number, max: number }} [range=GAUGE_RANGE]
 * @returns {number} percentage from the left edge, clamped to 0–100
 */
export function bmiToPercent(bmi, range = GAUGE_RANGE) {
  const pct = ((bmi - range.min) / (range.max - range.min)) * 100;
  return Math.min(100, Math.max(0, pct));
}
