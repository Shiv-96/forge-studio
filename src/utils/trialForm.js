/**
 * src/utils/trialForm.js
 * Validation and Netlify Forms submission for the free-trial form.
 */

/** Name the hidden form in index.html uses. Must match exactly. */
export const TRIAL_FORM_NAME = 'free-trial';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Normalise an Indian mobile number to its 10 digits.
 * Accepts spaces, dashes and an optional +91, 91 or 0 prefix.
 * @param {string} raw - e.g. "+91 98765-43210"
 * @returns {string|null} "9876543210", or null when it is not a valid Indian mobile number
 */
export function normaliseIndianMobile(raw) {
  const digits = String(raw)
    .replace(/[\s\-()]/g, '')
    .replace(/^(\+91|91|0)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

/**
 * Validate the trial form values.
 * @param {{ name: string, phone: string, email: string, preferredClass: string, preferredTime: string, consent: boolean }} values
 * @returns {Record<string, string>} one message per invalid field (empty object = valid)
 */
export function validateTrialForm(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Enter your full name.';
  if (!normaliseIndianMobile(values.phone)) errors.phone = 'Enter a 10-digit Indian mobile number.';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address, like name@example.com.';
  if (!values.preferredClass) errors.preferredClass = 'Choose a class to try.';
  if (!values.preferredTime) errors.preferredTime = 'Choose a time that suits you.';
  if (!values.consent) errors.consent = 'Tick the box so we can contact you about your trial.';
  return errors;
}

/**
 * URL-encode a flat object as application/x-www-form-urlencoded (what Netlify expects).
 * @param {Record<string, string|boolean>} data
 * @returns {string}
 */
export function encodeForm(data) {
  return new URLSearchParams(Object.entries(data).map(([k, v]) => [k, String(v)])).toString();
}

/**
 * Submit a form to Netlify Forms with fetch.
 * Netlify intercepts POST requests to any page path when `form-name` matches a
 * form it detected at deploy time (the hidden form in index.html).
 *
 * The Vite dev server cannot receive form posts, so in development this
 * simulates a successful submission instead. Test real submissions on a
 * Netlify deploy (or with `netlify dev`).
 *
 * @param {string} formName
 * @param {Record<string, string|boolean>} data
 * @returns {Promise<void>} resolves on success, rejects with an Error otherwise
 */
export async function submitNetlifyForm(formName, data) {
  if (import.meta.env.DEV) {
    console.info('[dev] Simulated Netlify form submission:', formName, data);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return;
  }

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeForm({ 'form-name': formName, ...data }),
  });
  if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`);
}
