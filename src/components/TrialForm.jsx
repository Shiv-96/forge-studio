/**
 * src/components/TrialForm.jsx
 * Free-trial booking form, submitted to Netlify Forms with fetch.
 *
 * How the Netlify part works:
 *   1. index.html contains a hidden <form name="free-trial" netlify ...> with the same field names.
 *      Netlify finds it at deploy time and registers the form.
 *   2. This component posts URL-encoded data, including `form-name`, to "/".
 *   3. Submissions appear in the Netlify dashboard under Forms → free-trial.
 *
 * Also includes: a honeypot field for bots, client-side validation with inline
 * errors, a loading state, and success/error messages announced to screen readers.
 */
import { useRef, useState } from 'react';
import { classes } from '../data/classes';
import { TRIAL_FORM_NAME, normaliseIndianMobile, submitNetlifyForm, validateTrialForm } from '../utils/trialForm';
import { sectionPhotos } from '../data/site';
import Icon from './Icon';
import Photo from './Photo';
import Reveal from './Reveal';

const timeOptions = ['Early morning (6–9 AM)', 'Late morning (9 AM–12 PM)', 'Evening (5–9 PM)', 'Weekend'];

const initialValues = {
  name: '',
  phone: '',
  email: '',
  preferredClass: '',
  preferredTime: '',
  consent: false,
};

// Order matters: on submit, focus moves to the first invalid field in this order.
const fieldOrder = ['name', 'phone', 'email', 'preferredClass', 'preferredTime', 'consent'];

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-danger">
      {message}
    </p>
  );
}

export default function TrialForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [botField, setBotField] = useState('');
  const formRef = useRef(null);
  const successRef = useRef(null);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  };

  /** Shared accessibility props for a field: name, invalid state and the error it points to. */
  const fieldProps = (name) => ({
    id: `trial-${name}`,
    name,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `trial-${name}-error` : undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateTrialForm(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = fieldOrder.find((key) => found[key]);
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    // Honeypot: real people never see or fill this field. Pretend success for bots.
    if (botField) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    try {
      await submitNetlifyForm(TRIAL_FORM_NAME, {
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: normaliseIndianMobile(values.phone),
        consent: values.consent ? 'yes' : 'no',
        'bot-field': botField,
      });
      setStatus('success');
      setValues(initialValues);
      // Move focus to the confirmation so screen reader and keyboard users know it worked.
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="trial" aria-labelledby="trial-title" className="relative isolate overflow-hidden py-20 md:py-28">
      {/* Full-bleed class photo behind the section, darkened so text and form stay readable. */}
      <Photo
        id={sectionPhotos.trial.pexelsId}
        alt=""
        width={1600}
        height={1000}
        widths={[800, 1200, 1600, 2000]}
        sizes="100vw"
        className="!absolute inset-0 -z-20"
        imgClassName="object-[center_35%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-950/80" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/70 to-ink-950/40"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 -z-10 hidden h-full w-[38rem] -skew-x-12 bg-volt/[0.07] lg:block"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="eyebrow">Free trial</p>
          <h2 id="trial-title" className="heading-display mt-4 text-5xl text-ink-100 sm:text-6xl lg:text-7xl">
            Your first class <span className="block text-volt">is on us</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-400">
            Pick a class and a time. We will call you within one working day to confirm a slot.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              'A 10-minute chat about goals and any injuries',
              'One full coached class at your level',
              'A tour of the studio. No sales pressure.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink-100">
                <Icon name="check" className="mt-0.5 size-5 shrink-0 text-volt" strokeWidth={2.25} />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="card p-6 sm:p-8">
          {status === 'success' ? (
            <div ref={successRef} tabIndex={-1} role="status" className="py-10 text-center outline-none">
              <span className="mx-auto inline-flex size-16 items-center justify-center bg-volt text-ink-950">
                <Icon name="check" className="size-8" strokeWidth={2.5} />
              </span>
              <h3 className="heading-display mt-6 text-4xl text-ink-100">You are booked in</h3>
              <p className="mx-auto mt-3 max-w-sm text-ink-400">
                Thanks. We will call you within one working day to confirm your trial class. See you on the floor.
              </p>
              <button type="button" className="btn btn-ghost mt-8" onClick={() => setStatus('idle')}>
                Book another trial
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              name={TRIAL_FORM_NAME}
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={onSubmit}
              noValidate
            >
              {/* Netlify needs form-name in the payload; it is added in submitNetlifyForm. */}
              <input type="hidden" name="form-name" value={TRIAL_FORM_NAME} />

              {/* Honeypot, hidden from people and assistive tech. */}
              <p className="hidden" aria-hidden="true">
                <label>
                  Leave this empty:
                  <input
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                  />
                </label>
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="trial-name" className="block text-sm font-semibold text-ink-100">
                    Full name
                  </label>
                  <input
                    {...fieldProps('name')}
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={onChange}
                    className="field mt-2"
                  />
                  <FieldError id="trial-name-error" message={errors.name} />
                </div>

                <div>
                  <label htmlFor="trial-phone" className="block text-sm font-semibold text-ink-100">
                    Mobile number
                  </label>
                  <input
                    {...fieldProps('phone')}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="98765 43210"
                    value={values.phone}
                    onChange={onChange}
                    className="field mt-2"
                  />
                  <FieldError id="trial-phone-error" message={errors.phone} />
                </div>

                <div>
                  <label htmlFor="trial-email" className="block text-sm font-semibold text-ink-100">
                    Email
                  </label>
                  <input
                    {...fieldProps('email')}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={onChange}
                    className="field mt-2"
                  />
                  <FieldError id="trial-email-error" message={errors.email} />
                </div>

                <div>
                  <label htmlFor="trial-preferredClass" className="block text-sm font-semibold text-ink-100">
                    Class to try
                  </label>
                  <select
                    {...fieldProps('preferredClass')}
                    value={values.preferredClass}
                    onChange={onChange}
                    className="field mt-2"
                  >
                    <option value="">Choose a class</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  <FieldError id="trial-preferredClass-error" message={errors.preferredClass} />
                </div>

                <div>
                  <label htmlFor="trial-preferredTime" className="block text-sm font-semibold text-ink-100">
                    Preferred time
                  </label>
                  <select
                    {...fieldProps('preferredTime')}
                    value={values.preferredTime}
                    onChange={onChange}
                    className="field mt-2"
                  >
                    <option value="">Choose a time</option>
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <FieldError id="trial-preferredTime-error" message={errors.preferredTime} />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-start gap-3">
                    <input
                      {...fieldProps('consent')}
                      type="checkbox"
                      checked={values.consent}
                      onChange={onChange}
                      className="mt-1 size-5 shrink-0 accent-volt"
                    />
                    <label htmlFor="trial-consent" className="text-sm leading-relaxed text-ink-400">
                      I agree to be contacted by phone or email about my free trial. We never share your details.
                    </label>
                  </div>
                  <FieldError id="trial-consent-error" message={errors.consent} />
                </div>
              </div>

              {status === 'error' && (
                <p role="alert" className="mt-6 border border-danger/60 bg-danger/10 p-4 text-sm text-ink-100">
                  We could not send your request. Check your connection and try again, or call us on the number below.
                </p>
              )}

              <button type="submit" className="btn btn-primary mt-7 w-full" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="size-4 animate-spin rounded-full border-2 border-ink-950 border-t-transparent"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Book my free trial
                    <Icon name="arrowRight" className="size-5" />
                  </>
                )}
              </button>
              <p className="sr-only" aria-live="polite">
                {status === 'submitting' ? 'Sending your request' : ''}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
