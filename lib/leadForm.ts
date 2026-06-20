/* Client-side lead-form logic: validation, sanitisation, WhatsApp link and
 * Web3Forms delivery. No personal data ever touches a page URL except the
 * WhatsApp `text` param, which carries only what the visitor typed. */

import { settings } from '@/content/site-content';

export type RequestType = 'Book a Demo' | 'Request a Quote';

export type LeadFormValues = {
  requestType: RequestType;
  school: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. Bots fill it. */
  company: string;
};

export const initialLeadValues: LeadFormValues = {
  requestType: 'Book a Demo',
  school: '',
  name: '',
  role: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
  company: '',
};

export type FieldErrors = Partial<Record<keyof LeadFormValues, string>>;

const LIMITS = {
  school: 120,
  name: 80,
  role: 80,
  email: 160,
  phone: 32,
  message: 2000,
} as const;

/** Remove control characters (incl. CR/LF/TAB) that enable header/text
 *  injection, collapse runs of whitespace and trim. Never trust raw input. */
export function sanitiseText(input: string): string {
  return input
    .replace(/[\x00-\x1F\x7F]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function sanitisePhone(input: string): string {
  return input
    .replace(/[^\d+()\-\s]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\d\s]{7,}$/;

/** Returns a sanitised copy of the values, applying length caps. */
export function sanitiseValues(values: LeadFormValues): LeadFormValues {
  return {
    ...values,
    school: sanitiseText(values.school).slice(0, LIMITS.school),
    name: sanitiseText(values.name).slice(0, LIMITS.name),
    role: sanitiseText(values.role).slice(0, LIMITS.role),
    email: sanitiseText(values.email).slice(0, LIMITS.email),
    phone: sanitisePhone(values.phone).slice(0, LIMITS.phone),
    message: sanitiseText(values.message).slice(0, LIMITS.message),
  };
}

export function validate(values: LeadFormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.school) errors.school = 'School name is required.';
  if (!values.name) errors.name = 'Your name is required.';
  if (!values.email) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Enter a valid email address.';
  if (values.phone && !PHONE_RE.test(values.phone)) errors.phone = 'Enter a valid phone number.';
  if (!values.consent) errors.consent = 'Please accept the privacy notice to continue.';
  return errors;
}

/** Human-readable summary used for both the email body and the WhatsApp text. */
export function buildSummary(v: LeadFormValues): string {
  return [
    `Request type: ${v.requestType}`,
    `School: ${v.school}`,
    `Name: ${v.name}`,
    v.role && `Role: ${v.role}`,
    `Email: ${v.email}`,
    v.phone && `Phone: ${v.phone}`,
    v.message && `Message: ${v.message}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildWhatsAppLink(v: LeadFormValues): string {
  const text = `Hi Classly, I'd like to ${v.requestType.toLowerCase()}.\n\n${buildSummary(v)}`;
  return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export type SubmitResult = { ok: true } | { ok: false; error: string };

/** Deliver the submission to our own serverless route, which emails it to
 *  info@classlyempowering.co.za over SMTP. Returns a typed result; never throws. */
export async function submitLead(v: LeadFormValues): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/contact/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(v),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
    if (res.ok && data.success) return { ok: true };
    return {
      ok: false,
      error: data.error || 'Something went wrong. Please try WhatsApp or email below.',
    };
  } catch {
    return { ok: false, error: 'Network error. Please try WhatsApp or email below.' };
  }
}
