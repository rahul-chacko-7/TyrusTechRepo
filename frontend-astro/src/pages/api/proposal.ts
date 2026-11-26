import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { site } from '../../data/site';

/**
 * Website lead endpoint. Every lead form posts here.
 * The lead is emailed to the corporate sales inbox (site.email) and saved to
 * Supabase when a key is configured. No automatic proposal is sent to the
 * visitor: the sales team replies with a written quote.
 */

type ProposalPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  pages: number;
  message: string;
  source?: { page?: string; formId?: string; title?: string };
  attribution?: { first?: Record<string, string>; latest?: Record<string, string> };
};

function clip(value: unknown, max = 500): string {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

function cleanRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object') return {};
  const out: Record<string, string> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>).slice(0, 20)) {
    const k = clip(key, 40);
    const v = clip(raw, 300);
    if (k && v) out[k] = v;
  }
  return out;
}

function describeAttribution(payload: ProposalPayload): string[] {
  const first = payload.attribution?.first || {};
  const latest = payload.attribution?.latest || {};
  const line = (label: string, rec: Record<string, string>) => {
    const parts = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'gclid', 'landing_page', 'referrer']
      .filter((k) => rec[k])
      .map((k) => `${k}=${rec[k]}`);
    return `${label}: ${parts.length ? parts.join(' | ') : 'direct / not captured'}`;
  };
  return [
    `Form page: ${safeText(payload.source?.page)} (${safeText(payload.source?.formId, 'form')})`,
    line('First touch', first),
    line('This visit', latest)
  ];
}

async function saveLead(payload: ProposalPayload, estimatedPrice: number): Promise<'saved' | 'skipped' | 'failed'> {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return 'skipped';
  try {
    const client = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await client.from('leads').insert([{
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.phone,
      city: payload.city,
      pages: Math.max(0, Math.round(payload.pages || 0)),
      estimated_price: Math.max(0, Math.round(estimatedPrice))
    }]);
    if (error) {
      console.error('Lead save failed:', error.message);
      return 'failed';
    }
    return 'saved';
  } catch (error) {
    console.error('Lead save failed:', error);
    return 'failed';
  }
}

type MailerConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
};

function safeText(value: unknown, fallback = 'Not provided'): string {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function getMailerConfig(): MailerConfig | null {
  const host = import.meta.env.SMTP_HOST || 'mail.tyrustech.com';
  const port = Number(import.meta.env.SMTP_PORT || 465);
  const user = import.meta.env.SMTP_USER || 'sales@tyrustech.com';
  const pass = import.meta.env.SMTP_PASS;
  const from = import.meta.env.MAIL_FROM || 'sales@tyrustech.com';

  if (!pass) {
    return null;
  }

  return { host, port, user, pass, from };
}

function createTransporter(config: MailerConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass }
  });
}

type PricingSnapshot = {
  pricePerPage: number;
  tierLabel: string;
  baseDays: number;
  timelineLabel: 'Standard' | 'Expedited' | 'Flexible';
  actualDays: number;
  estimatedTotal: number;
};

function calculatePricing(pages: number, timelineRaw: string): PricingSnapshot {
  const cleanPages = Math.max(0, Number(pages) || 0);
  let pricePerPage = 2.0;
  let tierLabel = 'Under 10k';
  let baseDays = 5;

  if (cleanPages >= 50000) {
    pricePerPage = 1.2;
    tierLabel = '50k+';
    baseDays = 15;
  } else if (cleanPages >= 10000) {
    pricePerPage = 1.6;
    tierLabel = '10k - 50k';
    baseDays = 10;
  }

  const timeline = String(timelineRaw || '').toLowerCase();
  let timelineLabel: PricingSnapshot['timelineLabel'] = 'Standard';
  let actualDays = baseDays;

  if (timeline === 'expedited') {
    timelineLabel = 'Expedited';
    actualDays = Math.max(3, Math.round(baseDays * 0.7));
  } else if (timeline === 'flexible') {
    timelineLabel = 'Flexible';
    actualDays = Math.round(baseDays * 1.2);
  }

  return {
    pricePerPage,
    tierLabel,
    baseDays,
    timelineLabel,
    actualDays,
    estimatedTotal: Math.round(cleanPages * pricePerPage)
  };
}

async function sendLeadNotificationEmail(payload: ProposalPayload): Promise<'sent' | 'skipped' | 'failed'> {
  const config = getMailerConfig();
  const leadRecipient = site.email;

  if (!config || !leadRecipient) {
    return 'skipped';
  }

  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const lines = [
    'New Tyrus website lead received.',
    '',
    `Submitted: ${submittedAt}`,
    `Name: ${safeText(payload.name)}`,
    `Company: ${safeText(payload.company)}`,
    `Email: ${safeText(payload.email)}`,
    `Phone: ${safeText(payload.phone)}`,
    `City / Location: ${safeText(payload.city)}`,
    `Estimated pages: ${Math.max(0, payload.pages || 0).toLocaleString('en-IN')}`,
    '',
    'Message / requirement:',
    safeText(payload.message),
    '',
    ...describeAttribution(payload)
  ];

  try {
    const transporter = createTransporter(config);

    await transporter.sendMail({
      from: config.from,
      to: leadRecipient,
      replyTo: payload.email || undefined,
      subject: `New website lead - ${safeText(payload.company, payload.name)}${payload.pages ? ` - ${payload.pages.toLocaleString('en-IN')} pages` : ''}`,
      text: lines.join('\n')
    });
    return 'sent';
  } catch (error) {
    console.error('Lead notification email send failed:', error);
    return 'failed';
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as Partial<ProposalPayload> & { website?: string; elapsedMs?: number };

    // Spam traps: hidden honeypot field, or a form completed implausibly fast.
    if (clip(body.website) || (typeof body.elapsedMs === 'number' && body.elapsedMs >= 0 && body.elapsedMs < 2500)) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    const payload: ProposalPayload = {
      name: clip(body.name, 120),
      company: safeText(clip(body.company, 160)),
      email: clip(body.email, 160).toLowerCase(),
      phone: safeText(clip(body.phone, 40)),
      city: safeText(clip(body.city, 120)),
      pages: Math.min(100_000_000, Math.max(0, Number(body.pages) || 0)),
      message: safeText(clip(body.message, 2000)),
      source: cleanRecord(body.source),
      attribution: {
        first: cleanRecord(body.attribution?.first),
        latest: cleanRecord(body.attribution?.latest)
      }
    };

    if (!payload.name || !payload.email) {
      return new Response(JSON.stringify({ error: 'Name and email are required.' }), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });
    }

    const estimate = payload.pages ? calculatePricing(payload.pages, 'standard').estimatedTotal : 0;
    const [leadEmailStatus, leadSaveStatus] = await Promise.all([
      sendLeadNotificationEmail(payload),
      saveLead(payload, estimate)
    ]);

    // If the lead reached neither the sales inbox nor the database, tell the
    // visitor so they can WhatsApp or email instead of losing the enquiry.
    if (leadEmailStatus !== 'sent' && leadSaveStatus !== 'saved') {
      console.error('Lead not delivered', { leadEmailStatus, leadSaveStatus });
      return new Response(JSON.stringify({ error: 'Unable to send your request right now.', leadEmailStatus, leadSaveStatus }), {
        status: 502,
        headers: { 'content-type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      leadEmailStatus,
      leadSaveStatus
    }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'x-lead-email-status': leadEmailStatus
      }
    });
  } catch (error) {
    console.error('Lead submission failed:', error);
    return new Response(JSON.stringify({ error: 'Unable to send your request right now.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
};
