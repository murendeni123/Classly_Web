'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import {
  initialLeadValues,
  sanitiseValues,
  validate,
  submitLead,
  buildWhatsAppLink,
  type LeadFormValues,
  type FieldErrors,
  type RequestType,
} from '@/lib/leadForm';
import { settings } from '@/content/site-content';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const COOLDOWN_MS = 8000;

const requestTypes: RequestType[] = ['Book a Demo', 'Request a Quote'];

declare global {
  interface Window {
    hcaptcha?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
    onHcaptchaLoad?: () => void;
  }
}

export function LeadForm({ defaultType = 'Book a Demo' }: { defaultType?: RequestType }) {
  const [values, setValues] = useState<LeadFormValues>({ ...initialLeadValues, requestType: defaultType });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const [submitted, setSubmitted] = useState<LeadFormValues | null>(null);
  const lastSubmit = useRef(0);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const tokenRef = useRef<string>('');

  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;
  const captchaEnabled = Boolean(sitekey);

  const renderCaptcha = useCallback(() => {
    if (!captchaEnabled || !captchaRef.current || !window.hcaptcha || widgetId.current) return;
    widgetId.current = window.hcaptcha.render(captchaRef.current, {
      sitekey,
      callback: (token: string) => {
        tokenRef.current = token;
      },
      'expired-callback': () => {
        tokenRef.current = '';
      },
    });
  }, [captchaEnabled, sitekey]);

  useEffect(() => {
    if (!captchaEnabled) return;
    window.onHcaptchaLoad = renderCaptcha;
    if (window.hcaptcha) renderCaptcha();
  }, [captchaEnabled, renderCaptcha]);

  const set = (field: keyof LeadFormValues, value: string | boolean) =>
    setValues((v) => ({ ...v, [field]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot: a real user never fills this hidden field.
    if (values.company.trim() !== '') return;

    // Client-side throttle.
    const now = Date.now();
    if (now - lastSubmit.current < COOLDOWN_MS && status !== 'idle') return;

    const clean = sanitiseValues(values);
    const fieldErrors = validate(clean);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    if (captchaEnabled && !tokenRef.current) {
      setServerError('Please complete the captcha.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setServerError('');
    lastSubmit.current = now;

    const result = await submitLead(clean);
    if (result.ok) {
      setSubmitted(clean);
      setStatus('success');
    } else {
      setServerError(result.error);
      setStatus('error');
      if (captchaEnabled && window.hcaptcha && widgetId.current) {
        window.hcaptcha.reset(widgetId.current);
        tokenRef.current = '';
      }
    }
  }

  if (status === 'success' && submitted) {
    return (
      <div className="rounded-2xl border border-classly-green/30 bg-classly-green/5 p-8 text-center">
        <Image
          src="/brand/happy-icon.png"
          alt=""
          aria-hidden
          width={96}
          height={96}
          className="mx-auto mb-4 h-20 w-20 object-contain"
        />
        <h3 className="text-xl font-bold text-classly-navy">Thank you — we’ve got it.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Your {submitted.requestType.toLowerCase()} request has been sent to our team. Prefer to chat now? Continue on WhatsApp and we’ll pick up from there.
        </p>
        <a
          href={buildWhatsAppLink(submitted)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <>
      {captchaEnabled && (
        <Script
          src="https://js.hcaptcha.com/1/api.js?onload=onHcaptchaLoad&render=explicit"
          strategy="afterInteractive"
        />
      )}
      <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
        <fieldset className="mb-5">
          <legend className="mb-2 text-sm font-semibold text-classly-navy">I’d like to</legend>
          <div className="grid grid-cols-2 gap-3">
            {requestTypes.map((t) => (
              <label
                key={t}
                className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium transition-colors ${
                  values.requestType === t
                    ? 'border-classly-green bg-classly-green/10 text-classly-green-deep'
                    : 'border-line text-muted hover:border-classly-blue/40'
                }`}
              >
                <input
                  type="radio"
                  name="requestType"
                  value={t}
                  checked={values.requestType === t}
                  onChange={() => set('requestType', t)}
                  className="sr-only"
                />
                {t}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="school" label="School name" required value={values.school} error={errors.school} onChange={(v) => set('school', v)} autoComplete="organization" />
          <Field id="name" label="Your name" required value={values.name} error={errors.name} onChange={(v) => set('name', v)} autoComplete="name" />
          <Field id="role" label="Your role" value={values.role} error={errors.role} onChange={(v) => set('role', v)} placeholder="e.g. Principal, Deputy, HOD" />
          <Field id="email" label="Email" type="email" required value={values.email} error={errors.email} onChange={(v) => set('email', v)} autoComplete="email" />
          <Field id="phone" label="Phone" type="tel" value={values.phone} error={errors.phone} onChange={(v) => set('phone', v)} autoComplete="tel" />
        </div>

        <div className="mt-4">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-classly-navy">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            maxLength={2000}
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            className="w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition-colors focus:border-classly-blue"
            placeholder="Tell us about your school and what you’re looking for."
          />
        </div>

        {/* Honeypot — visually hidden, off the tab order, ignored by humans. */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
          />
        </div>

        <div className="mt-5 flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set('consent', e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-line text-classly-green focus:ring-classly-green"
          />
          <label htmlFor="consent" className="text-sm text-muted">
            I consent to Classly using these details to respond to my enquiry, in line with the{' '}
            <a href="/privacy" className="font-medium text-classly-blue underline underline-offset-2">
              privacy notice
            </a>
            . <span className="text-classly-orange">*</span>
          </label>
        </div>
        {errors.consent && <p className="mt-1.5 text-sm text-red-600">{errors.consent}</p>}

        {captchaEnabled && <div ref={captchaRef} className="mt-5" />}

        {status === 'error' && serverError && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-classly-green px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-classly-green-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : `Send my ${values.requestType.toLowerCase()} request`}
        </button>

        <p className="mt-4 text-center text-xs text-muted">
          Prefer WhatsApp? Message us on{' '}
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-classly-blue underline underline-offset-2"
          >
            {settings.whatsappDisplay}
          </a>
        </p>
      </form>
    </>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

function Field({ id, label, value, onChange, error, type = 'text', required, placeholder, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-classly-navy">
        {label} {required && <span className="text-classly-orange">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-classly-blue ${
          error ? 'border-red-400' : 'border-line'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
