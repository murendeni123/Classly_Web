'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import {
  initialLeadValues,
  sanitiseValues,
  validate,
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

  function onSubmit(e: React.FormEvent) {
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

    lastSubmit.current = now;

    // Open WhatsApp with the captured details pre-filled, addressed to our
    // number — the visitor just taps send. Opened in a new tab so the site
    // stays put. Must run synchronously in the click handler (no awaits before
    // it) so the browser treats it as a user gesture and doesn't block it.
    window.open(buildWhatsAppLink(clean), '_blank', 'noopener,noreferrer');
    setSubmitted(clean);
    setStatus('success');
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
        <h3 className="text-xl font-bold text-classly-navy">Almost done — just tap send.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          We’ve opened WhatsApp with your {submitted.requestType.toLowerCase()} details ready to go — just press send and we’ll take it from there. If WhatsApp didn’t open, tap the button below.
        </p>
        <a
          href={buildWhatsAppLink(submitted)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
        >
          Open WhatsApp
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

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:brightness-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          Send via WhatsApp
        </button>

        <p className="mt-3 text-center text-xs text-muted">
          Tapping send opens WhatsApp with your details pre-filled — you just press send. No app? You can also email{' '}
          <a href={`mailto:${settings.email}`} className="font-medium text-classly-blue underline underline-offset-2">
            {settings.email}
          </a>
          .
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
