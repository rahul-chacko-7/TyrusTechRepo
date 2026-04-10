import type { APIRoute } from 'astro';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import nodemailer from 'nodemailer';
import { readFile } from 'node:fs/promises';

type ProposalPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  pages: number;
  message: string;
};

function formatCurrency(value: number): string {
  const amount = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(Math.max(0, value));
  return `INR ${amount}`;
}

function safeText(value: unknown, fallback = 'Not provided'): string {
  const text = String(value ?? '').trim();
  return text || fallback;
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

function drawHeaderBand(page: any, text: string, pageWidth: number, pageHeight: number, fontBold: any): void {
  const primary = rgb(0.26, 0.41, 0.20); // #426932
  const accent = rgb(0.35, 0.70, 0.22); // #59B337
  page.drawRectangle({ x: 0, y: pageHeight - 90, width: pageWidth, height: 90, color: primary });
  page.drawRectangle({ x: 0, y: pageHeight - 90, width: pageWidth, height: 6, color: accent });
  page.drawText(text, {
    x: 42,
    y: pageHeight - 52,
    size: 20,
    color: rgb(1, 1, 1),
    font: fontBold
  });
}

function drawFooter(page: any, pageWidth: number, font: any): void {
  page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: 26, color: rgb(0.95, 0.99, 0.97) });
  page.drawText('CONFIDENTIAL  |  Copyright 2026 Tyrus Technologies', {
    x: 42,
    y: 9,
    size: 9,
    color: rgb(0.2, 0.3, 0.27),
    font
  });
}

function drawWatermark(page: any, pageWidth: number, pageHeight: number): void {
  page.drawCircle({ x: pageWidth - 40, y: pageHeight - 130, size: 80, color: rgb(0.92, 0.97, 0.90), borderWidth: 0 });
  page.drawCircle({ x: pageWidth - 20, y: pageHeight - 165, size: 40, color: rgb(0.96, 0.99, 0.94), borderWidth: 0 });
}

function drawButton(page: any, label: string, x: number, y: number, width: number, height: number, font: any, filled = false): void {
  const green = rgb(0.26, 0.41, 0.20);
  const highlight = rgb(0.35, 0.70, 0.22);
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: filled ? highlight : rgb(1, 1, 1),
    borderColor: green,
    borderWidth: 1
  });
  page.drawText(label, {
    x: x + 10,
    y: y + height / 2 - 5,
    size: 9,
    font,
    color: filled ? rgb(1, 1, 1) : green
  });
}

function drawMetricCard(page: any, opts: { x: number; y: number; w: number; h: number; title: string; value: string; font: any; fontBold: any; accent?: any }): void {
  const accent = opts.accent || rgb(0.26, 0.41, 0.20);
  page.drawRectangle({
    x: opts.x,
    y: opts.y,
    width: opts.w,
    height: opts.h,
    color: rgb(0.98, 0.99, 0.97),
    borderColor: rgb(0.84, 0.90, 0.80),
    borderWidth: 1
  });
  page.drawRectangle({
    x: opts.x,
    y: opts.y + opts.h - 5,
    width: opts.w,
    height: 5,
    color: accent
  });
  page.drawText(opts.title, {
    x: opts.x + 10,
    y: opts.y + opts.h - 20,
    size: 9,
    font: opts.font,
    color: rgb(0.24, 0.30, 0.28)
  });
  page.drawText(opts.value, {
    x: opts.x + 10,
    y: opts.y + opts.h - 40,
    size: 14,
    font: opts.fontBold,
    color: rgb(0.08, 0.12, 0.11)
  });
}

function drawBrandLockup(page: any, x: number, y: number, font: any, fontBold: any): void {
  const emerald = rgb(0.26, 0.41, 0.20);
  page.drawRectangle({
    x,
    y,
    width: 30,
    height: 30,
    color: emerald
  });
  page.drawText('T', {
    x: x + 10,
    y: y + 8,
    size: 16,
    font: fontBold,
    color: rgb(1, 1, 1)
  });
  page.drawText('TYRUS TECHNOLOGIES', {
    x: x + 38,
    y: y + 16,
    size: 11,
    font: fontBold,
    color: emerald
  });
  page.drawText('Digitize. Secure. Go Green.', {
    x: x + 38,
    y: y + 4,
    size: 8,
    font,
    color: rgb(0.30, 0.40, 0.26)
  });
}

async function buildProposalPdf(payload: ProposalPayload): Promise<Uint8Array> {
  const now = new Date();
  const refNo = `Tyrus/PRO/${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}/${Math.floor(100 + Math.random() * 900)}`;
  const context = safeText(payload.message, '');
  const timelineMatch = context.match(/timeline\s+([a-z]+)/i);
  const fileMatch = context.match(/Requirement from calculator:\s*([^,]+)/i);
  const locationMatch = context.match(/location\s+(.+?)\.?$/i);
  const pricing = calculatePricing(payload.pages, timelineMatch?.[1] || 'standard');
  const fileType = safeText(fileMatch?.[1], 'Mixed office files');
  const location = safeText(payload.city, locationMatch?.[1] || 'Not provided');
  const clientName = safeText(payload.name, 'Client');
  const orgName = safeText(payload.company, 'Organization');
  const green = rgb(0.26, 0.41, 0.20); // #426932
  const greenAccent = rgb(0.35, 0.70, 0.22); // #59B337
  const dark = rgb(0.15, 0.20, 0.14);
  const light = rgb(0.97, 0.98, 0.99);
  const gold = rgb(0.84, 0.68, 0.27);

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let embeddedLogo: any = null;
  try {
    const logoBytes = await readFile(new URL('./tyrus-logo.png', import.meta.url));
    embeddedLogo = await pdf.embedPng(logoBytes);
  } catch {
    embeddedLogo = null;
  }
  const page1 = pdf.addPage([595, 842]);
  const page2 = pdf.addPage([595, 842]);
  const page3 = pdf.addPage([595, 842]);
  const width = page1.getWidth();
  const height = page1.getHeight();

  // Page 1 - Premium cover + vision
  page1.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.95, 0.98, 0.93) });
  page1.drawRectangle({ x: 0, y: 440, width, height: 402, color: rgb(0.26, 0.41, 0.20) });
  page1.drawRectangle({ x: 0, y: 430, width, height: 40, color: rgb(0.35, 0.70, 0.22) });
  page1.drawCircle({ x: 520, y: 760, size: 120, color: rgb(0.32, 0.54, 0.24) });
  page1.drawCircle({ x: 80, y: 120, size: 140, color: rgb(0.86, 0.94, 0.80) });
  if (embeddedLogo) {
    page1.drawImage(embeddedLogo, { x: 42, y: 728, width: 180, height: 70 });
  } else {
    drawBrandLockup(page1, 42, 760, font, fontBold);
  }

  page1.drawText('FROM PAPER CHAOS', { x: 42, y: 668, size: 32, font: fontBold, color: rgb(1, 1, 1) });
  page1.drawText('TO DIGITAL INTELLIGENCE', { x: 42, y: 628, size: 32, font: fontBold, color: rgb(1, 1, 1) });
  page1.drawText('Digitize. Secure. Go Green.', { x: 42, y: 590, size: 16, font: fontBold, color: rgb(0.90, 1, 0.85) });
  page1.drawText(`Ref ${refNo}  |  ${now.toLocaleDateString('en-IN')}`, {
    x: 42, y: 564, size: 10, font, color: rgb(0.90, 0.95, 0.89)
  });

  // glowing stats
  drawMetricCard(page1, { x: 42, y: 464, w: 160, h: 74, title: 'Impact', value: '10B+', font, fontBold, accent: green });
  page1.drawText('Documents Processed', { x: 52, y: 484, size: 9, font, color: rgb(0.25, 0.29, 0.28) });
  drawMetricCard(page1, { x: 218, y: 464, w: 160, h: 74, title: 'Clients', value: '250+', font, fontBold, accent: greenAccent });
  page1.drawText('Enterprise Institutions', { x: 228, y: 484, size: 9, font, color: rgb(0.25, 0.29, 0.28) });
  drawMetricCard(page1, { x: 394, y: 464, w: 160, h: 74, title: 'Estimated Value', value: formatCurrency(pricing.estimatedTotal), font, fontBold, accent: greenAccent });

  page1.drawText('Consulting-grade delivery for banks, hospitals and enterprise operations.', {
    x: 42, y: 420, size: 11, font, color: rgb(0.24, 0.33, 0.22)
  });
  drawFooter(page1, width, font);

  // Page 2 - Dashboard snapshot + trust + process + pricing
  page2.drawRectangle({ x: 0, y: 0, width, height, color: light });
  drawHeaderBand(page2, 'SNAPSHOT | TRUST | PROCESS | PRICING', width, height, fontBold);
  if (embeddedLogo) {
    page2.drawImage(embeddedLogo, { x: 42, y: 728, width: 180, height: 70 });
  } else {
    drawBrandLockup(page2, 42, 760, font, fontBold);
  }
  // dashboard cards
  drawMetricCard(page2, { x: 42, y: 650, w: 120, h: 76, title: 'Client', value: clientName, font, fontBold });
  drawMetricCard(page2, { x: 175, y: 650, w: 120, h: 76, title: 'Pages', value: `${Math.max(0, payload.pages || 0).toLocaleString('en-IN')}`, font, fontBold });
  drawMetricCard(page2, { x: 308, y: 650, w: 120, h: 76, title: 'Timeline', value: pricing.timelineLabel, font, fontBold });
  drawMetricCard(page2, { x: 441, y: 650, w: 112, h: 76, title: 'Cost', value: formatCurrency(pricing.estimatedTotal), font, fontBold, accent: gold });

  // trust row
  page2.drawRectangle({ x: 42, y: 592, width: 511, height: 44, color: rgb(1, 1, 1), borderColor: rgb(0.87, 0.90, 0.92), borderWidth: 1 });
  page2.drawText('Security & Compliance', { x: 58, y: 614, size: 10, font: fontBold, color: green });
  page2.drawText('Experience & Scale', { x: 230, y: 614, size: 10, font: fontBold, color: green });
  page2.drawText('Enterprise Readiness', { x: 392, y: 614, size: 10, font: fontBold, color: green });
  page2.drawText('ISO-aligned controls', { x: 58, y: 600, size: 8, font, color: dark });
  page2.drawText('10B+ docs delivered', { x: 230, y: 600, size: 8, font, color: dark });
  page2.drawText('Governance-first execution', { x: 392, y: 600, size: 8, font, color: dark });

  // process flow
  page2.drawText('[Consult]  ->  [Digitize]  ->  [Deploy]', { x: 42, y: 560, size: 12, font: fontBold, color: green });
  page2.drawText('Assess scope', { x: 52, y: 544, size: 8, font, color: dark });
  page2.drawText('OCR + indexing', { x: 220, y: 544, size: 8, font, color: dark });
  page2.drawText('Cloud-ready records', { x: 390, y: 544, size: 8, font, color: dark });

  // pricing cards
  const tierCards: Array<{ title: string; price: string; days: string; best?: boolean }> = [
    { title: 'Under 10k', price: 'INR 2.0 / page', days: 'Base 5 days' },
    { title: '10k - 50k', price: 'INR 1.6 / page', days: 'Base 10 days' },
    { title: '50k+ (Best Value)', price: 'INR 1.2 / page', days: 'Base 15 days', best: true }
  ];
  let cardX = 42;
  for (const card of tierCards) {
    page2.drawRectangle({
      x: cardX,
      y: 420,
      width: 160,
      height: 106,
      color: card.best ? rgb(0.90, 0.97, 0.93) : rgb(0.97, 0.99, 0.98),
      borderColor: card.best ? gold : rgb(0.75, 0.86, 0.80),
      borderWidth: card.best ? 2 : 1
    });
    page2.drawText(card.title, { x: cardX + 12, y: 492, size: 10, font: fontBold, color: card.best ? green : dark });
    page2.drawText(card.price, { x: cardX + 12, y: 470, size: 10, font: fontBold, color: dark });
    page2.drawText(card.days, { x: cardX + 12, y: 450, size: 9, font, color: dark });
    cardX += 176;
  }

  page2.drawText('Timeline Logic: Standard | Expedited (x0.7) | Flexible (x1.2)', {
    x: 42, y: 390, size: 10, font, color: rgb(0.28, 0.36, 0.24)
  });
  drawFooter(page2, width, font);

  // Page 3 - Money page + social proof + CTA
  page3.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.96, 0.97, 0.98) });
  drawHeaderBand(page3, 'YOUR INVESTMENT SNAPSHOT', width, height, fontBold);
  if (embeddedLogo) {
    page3.drawImage(embeddedLogo, { x: 42, y: 728, width: 180, height: 70 });
  } else {
    drawBrandLockup(page3, 42, 760, font, fontBold);
  }
  page3.drawRectangle({ x: 42, y: 558, width: 511, height: 128, color: rgb(1, 1, 1), borderColor: rgb(0.85, 0.88, 0.90), borderWidth: 1 });
  page3.drawText('Your Investment', { x: 236, y: 648, size: 16, font: fontBold, color: green });
  page3.drawText(`${formatCurrency(pricing.estimatedTotal)}`, { x: 168, y: 610, size: 34, font: fontBold, color: greenAccent });
  page3.drawText(`${Math.max(0, payload.pages || 0).toLocaleString('en-IN')} pages  |  INR ${pricing.pricePerPage}/page  |  ${pricing.actualDays} days`, {
    x: 104, y: 588, size: 10, font, color: dark
  });
  page3.drawText(`(${Math.max(0, payload.pages || 0).toLocaleString('en-IN')} x ${pricing.pricePerPage})`, {
    x: 248, y: 572, size: 9, font, color: rgb(0.35, 0.35, 0.35)
  });

  page3.drawText('Trusted by India’s Leading Institutions', { x: 42, y: 520, size: 12, font: fontBold, color: green });
  const partnerCards = ['COCHIN SHIPYARD', 'INDIAN NAVY', 'CMC VELLORE', 'CARITHAS'];
  let partnerX = 42;
  for (const partner of partnerCards) {
    page3.drawRectangle({ x: partnerX, y: 488, width: 120, height: 24, color: rgb(0.97, 0.98, 0.99), borderColor: rgb(0.82, 0.85, 0.88), borderWidth: 1 });
    page3.drawText(partner, { x: partnerX + 8, y: 496, size: 8, font: fontBold, color: rgb(0.18, 0.23, 0.26) });
    partnerX += 128;
  }

  page3.drawRectangle({ x: 0, y: 150, width, height: 120, color: green });
  page3.drawText('Start Your Digital Transformation Today', { x: 108, y: 236, size: 18, font: fontBold, color: rgb(1, 1, 1) });
  drawButton(page3, 'Call Now', 80, 190, 130, 28, fontBold, false);
  drawButton(page3, 'WhatsApp', 230, 190, 130, 28, fontBold, false);
  drawButton(page3, 'Email', 380, 190, 130, 28, fontBold, false);
  page3.drawText('corporatesales@tyrustech.com  |  +91 9742065852', {
    x: 166, y: 172, size: 9, font, color: rgb(0.85, 0.91, 0.95)
  });
  drawFooter(page3, width, font);

  return pdf.save();
}

async function sendProposalEmail(
  payload: ProposalPayload,
  pdfBytes: Uint8Array,
  fileName: string
): Promise<'sent' | 'skipped' | 'failed'> {
  const host = import.meta.env.SMTP_HOST;
  const port = Number(import.meta.env.SMTP_PORT || 587);
  const user = import.meta.env.SMTP_USER;
  const pass = import.meta.env.SMTP_PASS;
  const from = import.meta.env.MAIL_FROM || 'corporatesales@tyrustech.com';

  if (!host || !user || !pass || !payload.email) {
    return 'skipped';
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from,
      to: payload.email,
      cc: import.meta.env.MAIL_CC || undefined,
      subject: `Business Proposal - Tyrus Technologies (${safeText(payload.company, payload.name)})`,
      text: `Hi ${payload.name},\n\nPlease find attached your business proposal based on the submitted requirements.\n\nRegards,\nTyrus Technologies`,
      attachments: [
        {
          filename: fileName,
          content: Buffer.from(pdfBytes)
        }
      ]
    });
    return 'sent';
  } catch (error) {
    console.error('Proposal email send failed:', error);
    return 'failed';
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as Partial<ProposalPayload>;
    const payload: ProposalPayload = {
      name: safeText(body.name, ''),
      company: safeText(body.company),
      email: safeText(body.email, ''),
      phone: safeText(body.phone),
      city: safeText(body.city),
      pages: Number(body.pages) || 0,
      message: safeText(body.message)
    };

    if (!payload.name || !payload.email) {
      return new Response(JSON.stringify({ error: 'Name and email are required.' }), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });
    }

    const pdfBytes = await buildProposalPdf(payload);
    const fileName = `Tyrus-Proposal-${safeText(payload.company, payload.name).replace(/[^a-zA-Z0-9-_]/g, '-')}.pdf`;
    const emailStatus = await sendProposalEmail(payload, pdfBytes, fileName);

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'content-type': 'application/pdf',
        'content-disposition': `attachment; filename="${fileName}"`,
        'x-email-status': emailStatus
      }
    });
  } catch (error) {
    console.error('Proposal PDF generation failed:', error);
    return new Response(JSON.stringify({ error: 'Unable to generate proposal right now.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
};
