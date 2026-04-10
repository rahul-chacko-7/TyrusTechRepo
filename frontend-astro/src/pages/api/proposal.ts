import type { APIRoute } from 'astro';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import nodemailer from 'nodemailer';

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
  const navy = rgb(0.01, 0.20, 0.40);
  page.drawRectangle({ x: 0, y: pageHeight - 90, width: pageWidth, height: 90, color: navy });
  page.drawRectangle({ x: 0, y: pageHeight - 90, width: pageWidth, height: 6, color: rgb(0.03, 0.44, 0.30) });
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
  page.drawCircle({ x: pageWidth - 40, y: pageHeight - 130, size: 80, color: rgb(0.90, 0.97, 0.94), borderWidth: 0 });
  page.drawCircle({ x: pageWidth - 20, y: pageHeight - 165, size: 40, color: rgb(0.95, 0.99, 0.97), borderWidth: 0 });
}

function drawButton(page: any, label: string, x: number, y: number, width: number, height: number, font: any, filled = false): void {
  const green = rgb(0.03, 0.44, 0.30);
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: filled ? green : rgb(1, 1, 1),
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

function drawBrandLockup(page: any, x: number, y: number, font: any, fontBold: any): void {
  const emerald = rgb(0.03, 0.44, 0.30);
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
    color: rgb(0.22, 0.34, 0.30)
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
  const green = rgb(0.03, 0.44, 0.30);
  const dark = rgb(0.08, 0.12, 0.11);

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const page1 = pdf.addPage([595, 842]);
  const page2 = pdf.addPage([595, 842]);
  const page3 = pdf.addPage([595, 842]);
  const width = page1.getWidth();
  const height = page1.getHeight();

  // Page 1 - Introduction & Service Overview
  drawWatermark(page1, width, height);
  drawHeaderBand(page1, 'CORPORATE PROPOSAL', width, height, fontBold);
  drawBrandLockup(page1, 42, 760, font, fontBold);
  page1.drawRectangle({ x: 360, y: 630, width: 190, height: 140, color: rgb(0.94, 0.99, 0.96), borderColor: green, borderWidth: 1 });
  page1.drawText('Proposal Snapshot', { x: 376, y: 744, size: 11, font: fontBold, color: green });
  page1.drawText(`Client: ${clientName}`, { x: 376, y: 724, size: 9, font, color: dark });
  page1.drawText(`Company: ${orgName}`, { x: 376, y: 709, size: 9, font, color: dark });
  page1.drawText(`Pages: ${Math.max(0, payload.pages || 0).toLocaleString('en-IN')}`, { x: 376, y: 694, size: 9, font, color: dark });
  page1.drawText(`Estimate: ${formatCurrency(pricing.estimatedTotal)}`, { x: 376, y: 679, size: 9, font: fontBold, color: green });
  page1.drawText(`Timeline: ${pricing.timelineLabel}`, { x: 376, y: 664, size: 9, font, color: dark });
  page1.drawText('TYRUS TECHNOLOGIES', { x: 42, y: 725, size: 22, font: fontBold, color: green });
  page1.drawText('Document Digitization & Management', { x: 42, y: 702, size: 13, font, color: dark });
  page1.drawText('Your 3-Step Journey to a Paperless, Searchable Office', {
    x: 42,
    y: 670,
    size: 12,
    font: fontBold,
    color: green
  });
  page1.drawText(`Reference: ${refNo}`, { x: 42, y: 648, size: 10, font, color: rgb(0.35, 0.35, 0.35) });
  page1.drawText(`Date: ${now.toLocaleDateString('en-IN')}`, { x: 260, y: 648, size: 10, font, color: rgb(0.35, 0.35, 0.35) });

  page1.drawText('1. About Tyrus Technologies', { x: 42, y: 610, size: 14, font: fontBold, color: green });
  page1.drawText('- A decade of experience in the ECM domain.', { x: 54, y: 588, size: 11, font, color: dark });
  page1.drawText('- 10 Billion+ documents scanned for 250+ major clients.', { x: 54, y: 570, size: 11, font, color: dark });
  page1.drawText('- 100% secure and compliant project operations.', { x: 54, y: 552, size: 11, font, color: dark });

  page1.drawText('2. Our Process', { x: 42, y: 515, size: 14, font: fontBold, color: green });
  page1.drawText('Consultation & Audit', { x: 54, y: 493, size: 12, font: fontBold, color: dark });
  page1.drawCircle({ x: 45, y: 497, size: 4, color: green });
  page1.drawText('We assess your files, quality requirements and indexing rules.', { x: 70, y: 478, size: 10, font, color: dark });
  page1.drawText('Digitization & Data Capture', { x: 54, y: 448, size: 12, font: fontBold, color: dark });
  page1.drawCircle({ x: 45, y: 452, size: 4, color: green });
  page1.drawText('Scanning + OCR/ICR extraction for searchable and structured records.', { x: 70, y: 433, size: 10, font, color: dark });
  page1.drawText('Cloud Deployment', { x: 54, y: 403, size: 12, font: fontBold, color: dark });
  page1.drawCircle({ x: 45, y: 407, size: 4, color: green });
  page1.drawText('Delivery and integration with DMS platforms like Folderit and SharePoint.', { x: 70, y: 388, size: 10, font, color: dark });
  drawFooter(page1, width, font);

  // Page 2 - Service flow and pricing tiers
  drawWatermark(page2, width, height);
  drawHeaderBand(page2, '1. SERVICE FLOW & TIERS', width, height, fontBold);
  drawBrandLockup(page2, 42, 760, font, fontBold);
  const tierCards: Array<{ title: string; price: string; days: string; best?: boolean }> = [
    { title: 'Under 10k', price: 'INR 2.0 / page', days: 'Base 5 days' },
    { title: '10k - 50k', price: 'INR 1.6 / page', days: 'Base 10 days' },
    { title: '50k+ (Best Value)', price: 'INR 1.2 / page', days: 'Base 15 days', best: true }
  ];
  let cardX = 42;
  for (const card of tierCards) {
    page2.drawRectangle({
      x: cardX,
      y: 620,
      width: 160,
      height: 104,
      color: card.best ? rgb(0.90, 0.97, 0.93) : rgb(0.97, 0.99, 0.98),
      borderColor: rgb(0.75, 0.86, 0.80),
      borderWidth: 1
    });
    page2.drawText(card.title, { x: cardX + 12, y: 696, size: 10, font: fontBold, color: card.best ? green : dark });
    page2.drawText(card.price, { x: cardX + 12, y: 674, size: 10, font: fontBold, color: dark });
    page2.drawText(card.days, { x: cardX + 12, y: 654, size: 9, font, color: dark });
    cardX += 176;
  }

  page2.drawText('Timeline Adjustments', { x: 42, y: 570, size: 13, font: fontBold, color: green });
  page2.drawRectangle({ x: 42, y: 544, width: 511, height: 12, color: rgb(0.90, 0.95, 0.93), borderColor: rgb(0.75, 0.85, 0.81), borderWidth: 1 });
  const selectedX = pricing.timelineLabel === 'Expedited' ? 212 : pricing.timelineLabel === 'Flexible' ? 382 : 42;
  page2.drawRectangle({ x: selectedX, y: 544, width: 171, height: 12, color: green, borderWidth: 0 });
  page2.drawText('Standard', { x: 42, y: 530, size: 9, font: fontBold, color: pricing.timelineLabel === 'Standard' ? green : dark });
  page2.drawText('Expedited', { x: 212, y: 530, size: 9, font: fontBold, color: pricing.timelineLabel === 'Expedited' ? green : dark });
  page2.drawText('Flexible', { x: 392, y: 530, size: 9, font: fontBold, color: pricing.timelineLabel === 'Flexible' ? green : dark });
  page2.drawText('- Standard: Use base days.', { x: 54, y: 510, size: 10, font, color: dark });
  page2.drawText('- Expedited: Days = max(3, round(base x 0.7))', { x: 54, y: 494, size: 10, font, color: dark });
  page2.drawText('- Flexible: Days = round(base x 1.2)', { x: 54, y: 478, size: 10, font, color: dark });

  page2.drawText('Proposal generated from your submitted details:', {
    x: 42,
    y: 448,
    size: 11,
    font: fontBold,
    color: green
  });
  page2.drawText(`Client: ${clientName} (${orgName})`, { x: 54, y: 426, size: 10, font, color: dark });
  page2.drawText(`Email: ${safeText(payload.email)}`, { x: 54, y: 410, size: 10, font, color: dark });
  page2.drawText(`Phone: ${safeText(payload.phone)}`, { x: 54, y: 394, size: 10, font, color: dark });
  drawFooter(page2, width, font);

  // Page 3 - Custom quote snapshot
  drawWatermark(page3, width, height);
  drawHeaderBand(page3, '2. CUSTOM PROJECT SNAPSHOT', width, height, fontBold);
  drawBrandLockup(page3, 42, 760, font, fontBold);
  page3.drawRectangle({ x: 46, y: 646, width: 511, height: 72, color: rgb(0.87, 0.91, 0.90), borderWidth: 0 });
  page3.drawRectangle({ x: 42, y: 650, width: 511, height: 72, color: rgb(0.97, 1, 0.98), borderColor: rgb(0.78, 0.88, 0.83), borderWidth: 1 });
  page3.drawText(`Client Name: ${clientName}`, { x: 42, y: 706, size: 11, font: fontBold, color: dark });
  page3.drawText(`Organization: ${orgName}`, { x: 42, y: 690, size: 11, font, color: dark });
  page3.drawText(`Location: ${location}`, { x: 42, y: 674, size: 11, font, color: dark });
  page3.drawText(`Files: ${fileType}`, { x: 42, y: 658, size: 11, font, color: dark });

  page3.drawText('Specification', { x: 42, y: 624, size: 11, font: fontBold, color: dark });
  page3.drawText('Result', { x: 300, y: 624, size: 11, font: fontBold, color: dark });
  page3.drawLine({ start: { x: 42, y: 618 }, end: { x: 553, y: 618 }, thickness: 1, color: rgb(0.75, 0.85, 0.81) });

  const details: Array<[string, string]> = [
    ['Volume (pages)', `${Math.max(0, payload.pages || 0).toLocaleString('en-IN')}`],
    ['Price/Page (INR)', `${pricing.pricePerPage}`],
    ['Tier', pricing.tierLabel],
    ['Timeline', pricing.timelineLabel],
    ['Calculated Base Duration', `${pricing.baseDays} days`],
    ['Actual Duration', `${pricing.actualDays} days`]
  ];

  let detailsY = 594;
  for (const [label, value] of details) {
    page3.drawText(label, { x: 42, y: detailsY, size: 10, font, color: dark });
    page3.drawText(value, { x: 300, y: detailsY, size: 10, font, color: dark });
    detailsY -= 22;
  }

  page3.drawRectangle({ x: 42, y: 412, width: 511, height: 62, color: rgb(0.89, 0.97, 0.93), borderColor: green, borderWidth: 1 });
  page3.drawText('ESTIMATED TOTAL COST', { x: 56, y: 448, size: 12, font: fontBold, color: green });
  page3.drawText(`${formatCurrency(pricing.estimatedTotal)} (${Math.max(0, payload.pages || 0).toLocaleString('en-IN')} x ${pricing.pricePerPage})`, {
    x: 56,
    y: 428,
    size: 14,
    font: fontBold,
    color: dark
  });

  page3.drawText('Our Trusted Partners:', { x: 42, y: 372, size: 11, font: fontBold, color: green });
  page3.drawText('Cochin Shipyard Ltd  |  Indian Navy  |  CMC Vellore  |  Carithas Hospital', {
    x: 42,
    y: 356,
    size: 10,
    font,
    color: dark
  });
  page3.drawText('Notes: This is an auto-generated, whole-rupee estimate. Files and location do not alter base figures.', {
    x: 42,
    y: 324,
    size: 9,
    font,
    color: rgb(0.35, 0.35, 0.35)
  });
  drawButton(page3, 'Email: corporatesales@tyrustech.com', 42, 270, 250, 22, font, false);
  drawButton(page3, 'WhatsApp: +91 9742065852', 304, 270, 249, 22, font, false);
  drawButton(page3, 'START YOUR TRANSFORMATION', 42, 236, 511, 26, fontBold, true);
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
