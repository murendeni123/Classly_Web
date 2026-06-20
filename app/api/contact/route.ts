import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  initialLeadValues,
  sanitiseValues,
  validate,
  buildSummary,
  type LeadFormValues,
} from '@/lib/leadForm';

// nodemailer opens a real SMTP connection — needs the Node runtime, not edge.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  let raw: Partial<LeadFormValues>;
  try {
    raw = (await request.json()) as Partial<LeadFormValues>;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: silently accept (so bots see success) but never send.
  if (typeof raw.company === 'string' && raw.company.trim() !== '') {
    return NextResponse.json({ success: true });
  }

  // Re-sanitise and re-validate on the server — never trust the client.
  const clean = sanitiseValues({ ...initialLeadValues, ...raw } as LeadFormValues);
  const errors = validate(clean);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, error: 'Please check the form fields and try again.' },
      { status: 422 },
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Not configured yet — tell the form to fall back to WhatsApp/email.
    return NextResponse.json(
      { success: false, error: 'Email is not configured yet. Please use WhatsApp or email below.' },
      { status: 503 },
    );
  }

  const port = Number(SMTP_PORT) || 465;
  const secure = port === 465; // 465 = implicit TLS; 587 = STARTTLS
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    requireTLS: !secure, // force STARTTLS upgrade on 587
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const to = MAIL_TO || SMTP_USER;
  const from = MAIL_FROM || `Classly Website <${SMTP_USER}>`;
  const summary = buildSummary(clean);
  const htmlBody = `<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">${[
    ['Request type', clean.requestType],
    ['School', clean.school],
    ['Name', clean.name],
    ['Role', clean.role],
    ['Email', clean.email],
    ['Phone', clean.phone],
    ['Message', clean.message],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#16245C;font-weight:600;vertical-align:top">${k}</td><td style="padding:4px 0">${escapeHtml(
          String(v),
        )}</td></tr>`,
    )
    .join('')}</table>`;

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: clean.email,
      subject: `New ${clean.requestType} from ${clean.school || 'a school'}`,
      text: summary,
      html: htmlBody,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    // Log the real SMTP error server-side (never returned to the browser).
    console.error('[contact] SMTP send failed:', err);
    return NextResponse.json(
      { success: false, error: 'Could not send your message. Please use WhatsApp or email below.' },
      { status: 502 },
    );
  }
}
